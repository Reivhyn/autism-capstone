// IMPORTS
const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const kidUserSchema = require('../models/kidUserSchema')
const userSchema = require('../models/userSchema')

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

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params

    // ! check this when corey post schema
    const updatedEntery = await User.findByIdAndUpdate(id, {
      userType: req.body.UserType ?? userType,
      userName: req.body.userName ?? userName,
      firstName: req.body.firstName ?? firstName,
      lastName: req.body.lastName ?? lastName,
      dob: req.body.dob ?? dob,
      email: req.body.email ?? email,
      password: req.body.password ?? password,
      kids: req.body.kids ?? kids,
      parentUser: req.body.parentUser ?? parentUser,
      gamesAccess: req.body.gamesAccess ?? gamesAccess,
      chatAccess: req.body.chatAccess ?? chatAccess,
      learningAccess: req.body.learningAccess ?? learningAccess,
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
