// IMPORTS
const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//HELPER IMPORTS
//checks verifies incoming req.body
const { deconstructUser } = require('../helpers/deconstructUser')

//verifies the password chosen meets password requirements
const {
  validatePasswordCriteria,
} = require('../helpers/validatePasswordCriteria')
const userSchema = require('../models/userSchema')

//checks other schema for existing email or username

//GLOBALS
const SALT = Number(process.env.SALT)
const JWT_KEY = process.env.JWT_KEY

// Delete User
router.delete('/delete-user', async (req, res) => {
  try {
    console.log('Delete user endpoint hit')

    //  Extract userId from request body
    const { userSchema } = req.body
    if (!userSchema) {
      return res
        .status(400)
        .json({ success: false, message: 'Error: userId must be provided.' })
    }

    //  Handle dependent data
    if (user.userType === 'parent' && user.kids.length > 0) {
      console.log(
        'Warning: Parent user has dependent kids. Handle this if needed.'
      )
    }

    // Delete the user
    await User.deleteOne({ userName }) // Delete by userName

    // Return success response
    return res.status(200).json({ message: 'User successfully deleted' })
  } catch (error) {
    console.error('Error deleting user:', error)

    //  Handle server errors
    return res.status(500).json({ message: 'Server error', error })
  }
})

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

    console.log('newUser', newUser)

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
    const users = await userSchema.find({})
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
})

// Update User
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params

    const updatedEntery = await userSchema.findByIdAndUpdate(id, {
      userType: req.body.userType ?? userType,
      userName: req.body.userName ?? userName,
      firstName: req.body.firstName ?? firstName,
      lastName: req.body.lastName ?? lastName,
      dob: req.body.dob ?? dob,
      email: req.body.email ?? email,
      password: req.body.password ?? password,
      kids: req.body.kids ?? kids,
      parentUser: req.body.parentUser ?? parentUser,
      activitiesAccess: req.body.activitiesAccess ?? activitiesAccess,
      chatAccess: req.body.chatAccess ?? chatAccess,
    })
    res.status(200).json({
      message: `Modified`,
      updatedEntery,
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      error: `${err}`,
    })
  }
})

// Endpoint to get specific users by ID
router.post('/findSingleUser', async (req, res) => {
  try {
    console.log('find user endpoint hit')

    const user = await userSchema.findOne({ userName: req.body.userName })
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
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
    }) //4

    //if not found throw errror
    if (!foundUser) throw new Error('invalid username or password 1')

    //verify password
    const passwordVerified = await bcrypt.compare(
      userPassword,
      foundUser.password
    )

    //throw error if password invalid
    if (!passwordVerified) throw new Error('invalid username or password')

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
        message: `Welcome ${foundUser.userName}`,
      })
  } catch (error) {
    return res.status(500).json({
      message: `${error}`,
    })
  }
})
module.exports = router
