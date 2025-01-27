// IMPORTS
const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


//SCHEMA IMPORT
const userSchema = require('../models/userSchema')

//HELPER IMPORTS
//checks verifies incoming req.body
const { deconstructUser } = require('../helpers/deconstructUser')

//verifies the password chosen meets password requirements
const {
  validatePasswordCriteria,
} = require('../helpers/validatePasswordCriteria')
const { LuClock10 } = require('react-icons/lu')

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
    
    //hash user passprd
    newUser.password = bcrypt.hashSync(newUser.password, SALT)

    
    //save user
    await newUser.save()

    const {password,  ...userData} = newUser._doc
    
    //generate token
    const token = jwt.sign(
      //payload
      { id: newUser._id },
      //token key
      JWT_KEY,
      //epiration
      { expiresIn: '24 hours' }
    )
    
    //if this is called in the parent or admin portal on the front end do not issue token
    if (req.body.portalReg) {
      return res.status(200).json({
        message: `new ${newUser.userType} user created`,
        ...userData,
      })
    }
    
    return res
    .status(200)
    .cookie('authToken', token, {
      maxAge: 1000 * 60 * 60,
      sameSite: 'Strict',
      secure: false,
    })
    .json({
      message: `new ${newUser.userType} user created`,
      ...userData,
    })
  } catch (error) {
    return res.status(500).json({
      message: `${error}`,
    })
  }
})

router.post('/login', async (req, res) => {
  try {
    console.log('user login endpoint hit')

    deconstructUser(req.body, 'login')

    //grab userName and password
    const userName = req.body.userName
    const userPassword = req.body.password

    //look for user. case insensitive
    const foundUser = await userSchema.findOne({
      userName: { $regex: userName, $options: 'i' },
    }).select('+password') //4

    //if not found throw errror
    if (!foundUser) throw new Error('invalid username or password 1')

    //verify password
    const passwordVerified = await bcrypt.compare(
      userPassword,
      foundUser.password
    )

    //throw error if password invalid
    if (!passwordVerified) throw new Error('invalid username or password')

    //remove password from res 
    const {password,  ...userData} = foundUser._doc

    console.log('userData', userData)

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
        httpOnly: true,
        sameSite: 'lax',
        secure: false,
      })
      .json({
        message: `Welcome ${foundUser.userName}`,
        ...userData,
      })
  } catch (error) {
    return res.status(500).json({
      message: `${error}`,
    })
  }
})

module.exports = router
