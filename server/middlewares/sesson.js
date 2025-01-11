/*
 * This is the session middleware it validates the user befor access to the rest of the site.
 */
//IMPORTS
const userSchema = require('../models/userSchema')
const jwt = require('jsonwebtoken')
const JWT_KEY = process.env.JWT_KEY

//HELPERS

const validateSession = async (req, res, next) => {
  try {
    console.log('req.body', req.body)

    //check if endpoint accepts HTTP request
    if (req.method === 'OPTIONS') next()

    //check token has been provided
    if (!req.cookies.authToken) throw new Error('Forbidden')

    //assign token
    const userToken = req.cookies.authToken
    
    //verify token authenticity
    const payload = jwt.verify(userToken, JWT_KEY)

    //find user matching the token
    const foundUser = await userSchema.findById(payload.id)

    //if the user does not exist but token hasnt expired
    if (!foundUser) throw new Error('Forbidden')

    // add user info to request
    req.body = {...req.body,...foundUser._doc}

    // continue to next function
    next()
  } catch (error) {
    res.status(500).json({
      message: `${error}`
  })
  }
}

module.exports = {validateSession}


