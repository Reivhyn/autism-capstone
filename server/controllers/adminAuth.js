/*
 * this is the controler to register and login admins
 */

// IMPORTS
const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const adminUserSchema = require('../models/adminUserSchema')

//HELPER FUNCTIONS
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

//register new admin user
router.post('/register', async (req, res) => {
  try {
    console.log('register new admin user endpoint hit') //TODO REMOVE IN FINAL

    deconstructUser('admin', req.body)

    await checkForExiting('userName', req.body.userName)
    await checkForExiting('email', req.body.email)

    //create new admin user
    const newAdminUser = new adminUserSchema(req.body)

    validatePasswordCriteria(newAdminUser.password)

    //email to lowercase
    newAdminUser.email = newAdminUser.email.toLowerCase()

    //hash user passprd
    newAdminUser.password = bcrypt.hashSync(newAdminUser.password, SALT)

    //save user
    await newAdminUser.save()

    //TODO SET UP WEB OR SESSION INFO

    return res.json({
      message: 'new admin user created',
      userName: newAdminUser.userName,
    })
  } catch (error) {
    return res.status(500).json({
      message: `${error}`,
    })
  }
})

//log in admin user
router.get('/login', async (req, res) => {
  try {
    console.log('log in adminUser endpoint hit')

    deconstructUser('admin', req.body, 'login')

    //grab username and password
    const userEmail = req.body.email.toLowerCase()
    const userPassword = req.body.password

    //find user
    const foundUser = await adminUserSchema.findOne({ email: userEmail })

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
