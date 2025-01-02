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


// Delete User Function by userId
async function deleteUser(userId) {
  // Validate input
  if (!userId) {
    return { success: false, message: "Error: userId must be provided." };
  }

  try {
    // Find the user(not sure if we need this but just in case)
    const user = await User.findById(userId);
    if (!user) {
      return { success: false, message: "Error: User not found." };
    }

    // Handle dependent data 
    if (user.userType === "parent" && user.kids.length > 0) {
      console.log("Warning: Parent user has dependent kids. Handle this if needed.");
    }

    //  Delete the user
    await (!user).findByIdAndDelete(userId);

    //  Return success response
    return { success: true, message: "User successfully deleted." };
  } catch (error) {
    
    // Handle errors
    console.error("Error deleting user:", error);
    return { success: false, message: "Error: Unable to delete user." };
  }
}


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

router.post('/login', async (req, res) => {
  try {
    console.log('user login endpoint hit')

    deconstructUser(req.body, 'login')

    //grab email and password
    const userEmail = req.body.email.toLowerCase()
    const userPassword = req.body.password

    //look for user

    const foundUser = await userSchema.findOne({ email: userEmail })

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
