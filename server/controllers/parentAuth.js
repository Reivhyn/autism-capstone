/*
 * this is the controler to register and login parents
 */

// IMPORTS
const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const parentUserSchema = require('../models/parentUserSchema')

//HELPER IMPORTS
//checks verifies incoming req.body
const { deconstructUser } = require('../helpers/deconstructUser')

//varifies the password chosen meets password requirements
const {
  validatePasswordCriteria,
} = require('../helpers/validatePasswordCriteria')

//checks other schema for existing email or username
const { checkForExiting } = require('../helpers/checkForExisting')

//GLOBALS
const SALT = Number(process.env.SALT)
const JWT_KEY = process.env.JWT_KEY

//register new parent user
router.post('/register', async (req, res) => {
  try {
    console.log('register new parent user endpoint hit') //TODO REMOVE IN FINAL

    deconstructUser('parent', req.body)

    await checkForExiting('userName', req.body.userName)
    await checkForExiting('email', req.body.email)

    //create new parentUser
    const newParentUser = new parentUserSchema(req.body)

    validatePasswordCriteria(newParentUser.password)

    //email to lower case
    newParentUser.email = newParentUser.email.toLowerCase()

    //hash user password
    newParentUser.password = bcrypt.hashSync(newParentUser.password, SALT)

    //save user
    await newParentUser.save()

    //generate token
    const token = jwt.sign(
      //payload
      { id: newParentUser._id },
      //token key
      JWT_KEY,
      //epiration
      { expiresIn: '1 hour' }
    )

    return res
      .status(200)
      .cookie('authToken', token, {
        maxAge: 1000 * 60 * 60,
        sameSite: 'Strict',
        secure: false,
      })
      .json({
        message: 'new parent user created',
        userName: newParentUser.userName,
      })
  } catch (error) {
    return res.status(500).json({
      message: `${error}`,
    })
  }
})

//log in parent user
router.get('/login', async (req, res) => {
  try {
    console.log('log in parentUser endpoint hit')

    deconstructUser('parent', req.body, 'login')

    //grab username and password
    const userEmail = req.body.email.toLowerCase()
    const userPassword = req.body.password

    //find user
    const foundUser = await parentUserSchema.findOne({ email: userEmail })

    //if not found throw error
    if (!foundUser) throw new Error('Invalid username or password')

    //verify password
    const passwordVerification = await bcrypt.compare(
      userPassword,
      foundUser.password
    )

    //if password mismatch throw error
    if (!passwordVerification) throw new Error('Invalid username or password')

    //generate token
    const token = jwt.sign(
      //payload
      { id: foundUser._id },
      //token key
      JWT_KEY,
      //epiration
      { expiresIn: '1 hour' }
    )

    return res
      .status(200)
      .cookie('authToken', token, {
        maxAge: 1000 * 60 * 60,
        sameSite: 'Strict',
        secure: false,
      })
      .json({
        message: `${foundUser.userName} logged in`,
      })
  } catch (error) {
    return res.status(500).json({
      message: `${error}`,
    })
  }
})

module.exports = router
