/*
 * This is the session middleware it validates the user befor access to the rest of the site.
 */
//IMPORTS
const kidUserSchema = require('../models/kidUserSchema')
const parentUserSchema = require('../models/parentUserSchema')
const adminUserSchema = require('../models/adminUserSchema')

//HELPERS
const { findUser } = require('../helpers/findUser')

const validateSession = async (req, res, next) => {
  try {
    //check if endpoint accepts HTTP request
    if (req.method === 'OPTIONS') next()

    //check token has been provided
    if (!req.cookies.authToken) throw new Error('Forbidden')

    //assign token
    const userToken = req.cookies.authToken

    //find user matching the token
    const foundUser = await findUser(payload.id)

    //if the user does not exist but token hasnt expired
    if (!foundUser) throw new Error('Forbidden')

    //verify token authenticity
    const payload = jwt.verify(userToken, JWT_KEY)
  } catch (error) {}
}


