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
