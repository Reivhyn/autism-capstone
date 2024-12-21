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
const { deconstructParentUser } = require('../helpers/deconstructParentUser')

//varifies the password chosen meets password requirements
const {
  validatePasswordCriteria,
} = require('../helpers/validatePasswordCriteria')

//GLOBALS
const SALT = Number(process.env.SALT)
const JWT_KEY = process.env.JWT_KEY

//register new user
router.post('/register', async (req, res) => {
  try {
    console.log('register new parent user endpoint hit') //TODO REMOVE IN FINAL

    deconstructParentUser(req.body)

    //create new parentUser
    const newParentUser = new parentUserSchema(req.body)

    console.log(newParentUser)

    validatePasswordCriteria(newParentUser.password)

    //email to lower case
    newParentUser.email = newParentUser.email.toLowerCase()

    //hash user password
    newParentUser.password = bcrypt.hashSync(newParentUser.password, SALT)

    console.log(newParentUser) //TODO REMOVE IN FINAL

    //save user
    await newParentUser.save()

    //TODO SET UP WEB OR SESSION INFO

    return res.json({
      message: 'new parent user created',
      userName: newParentUser.userName,
    })
  } catch (error) {
    return res.status(500).json({
      message: `${error}`,
    })
  }
})

//log in user
router.get('/login', async (req, res) => {
  try {
    console.log('log in parentUser endpoint hit')

    deconstructParentUser(req.body, 'login')

    //grab username and password
    const userEmail = req.body.email.toLowerCase()
    const userPassword = req.body.password

    //find user
    const foundUser = await parentUserSchema.findOne({ email: userEmail })

    console.log('found user', foundUser)

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
