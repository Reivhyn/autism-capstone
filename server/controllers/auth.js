// IMPORTS
const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//HELPER IMPORTS
//checks verifies incoming req.body
const { deconstructUser } = require('../helpers/deconstructUser')

//varifies the password chosen meets password requirements
const {
  validatePasswordCriteria,
} = require('../helpers/validatePasswordCriteria')
const userSchema = require('../models/userSchema')

//checks other schema for existing email or username

//GLOBALS
const SALT = Number(process.env.SALT)
const JWT_KEY = process.env.JWT_KEY

//register new user
router.post('/register', async (req, res) => {
  try {
    console.log('register new user endpoint hit') //TODO REMOVE IN FINAL

    deconstructUser(req.body)

    //create new user
    const newUser = new userSchema(req.body)

    validatePasswordCriteria(newUser.password)

    //email to lowercase
    newUser.email = newUser.email.toLowerCase()

    //username to lowercase
    newUser.userNameLower = newUser.userName.toLowerCase()

    //hash user passprd
    newUser.password = bcrypt.hashSync(newUser.password, SALT)

    //save user
    await newUser.save()

    //generate token
        const token = jwt.sign(
          //payload
          { id: newUser._id },
          //token key
          JWT_KEY,
          //epiration
          { expiresIn: '1 hour' }
        )

    //TODO SET UP WEB OR SESSION INFO

    return res
      .status(200)
      .cookie('authToken', token, {
        maxAge: 1000 * 60 * 60,
        sameSite: 'Strict',
        secure: false,
      })
      .json({
        message: `new ${newUser.userType} user created`,
        userName: newUser.userName,
      })
  } catch (error) {
    return res.status(500).json({
      message: `${error}`,
    })
  }
})
// Endpoint to find all users
router.get('/findAllUsers', async (req, res) => {
  try {
      const users = await userSchema.find({});
      res.json(users);
  } catch (error) {
      res.status(500).json({ message: 'Server error', error });
  }
});

// Endpoint to get specific users by ID
router.post('/findSingleUser', async (req, res) => {
  try {
    console.log('find user endpoint hit')
    console.log("req.body",req.body)
      const user = await userSchema.findOne({userName:req.body.userName});
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
  } catch (error) {
      res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router