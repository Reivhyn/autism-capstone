/*
 * this is the controler to register and login kids
 */

// IMPORTS
const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const kidUserSchema = require('../models/kidUserSchema')

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

//register new kid user
router.post('/register', async (req, res) => {
  try {
    console.log('register new kid user endpoint hit') //TODO REMOVE IN FINAL

    deconstructUser('kid', req.body)

    await checkForExiting('userName', req.body.userName)

    //create new kidUser
    const newKidUser = new kidUserSchema(req.body)

    validatePasswordCriteria(newKidUser.password)

    //email to lower case
    newKidUser.email = newKidUser.email.toLowerCase()

    //hash user password
    newKidUser.password = bcrypt.hashSync(newKidUser.password, SALT)

    //save user
    await newKidUser.save()

    //TODO SET UP WEB OR SESSION INFO

    return res.json({
      message: 'new kid user created',
      userName: newKidUser.userName,
    })
  } catch (error) {
    return res.status(500).json({
      message: `${error}`,
    })
  }
})

//log in kid user
router.get('/login', async (req, res) => {
  try {
    console.log('log in kid user endpoint hit')

    deconstructUser('kid', req.body, 'login')

    //grab username and password
    const userEmail = req.body.email.toLowerCase()
    const userPassword = req.body.password

    //find user
    const foundUser = await kidUserSchema.findOne({ email: userEmail })

    //if not found throw error
    if (!foundUser) throw new Error('Invalid username or password')

    //verify password
    const passwordVerification = await bcrypt.compare(
      userPassword,
      foundUser.password
    )

    //if password mismatch throw error
    if (!passwordVerification) throw new Error('Invalid username or password')

    //create token
    //TODO create token

    return res.status(200).json({
      message: `${foundUser.userName} logged in`,
    })
  } catch (error) {
    return res.status(500).json({
      message: `${error}`,
    })
  }
})

module.exports = router
