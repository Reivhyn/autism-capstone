/*
 * This helper checks for existing usernames and emails in the different user schemas. It takes keyType - userName or Email and the key - value of the username or email to be ckecked.
 */

//IMPORTS
const kidUserSchema = require('../models/kidUserSchema')
const parentUserSchema = require('../models/parentUserSchema')
const adminUserSchema = require('../models/adminUserSchema')

async function checkForExistingUsername(userName) {
  //check for username in kids
  let foundUser = await kidUserSchema.findOne({ userName: userName })
  if (foundUser) return true

  //check for username in parents
  foundUser = await parentUserSchema.findOne({ userName: userName })
  if (foundUser) return true

  foundUser = await adminUserSchema.findOne({ userName: userName })
  if (foundUser) return true
}

async function checkForExistingEmail(email) {
  //check for existing email in parents
  let foundUser = await parentUserSchema.findOne({ email: email })
  if (foundUser) return true

  //check for exiting email in admin
  foundUser = await adminUserSchema.findOne({ email: email })
  if (foundUser) return true
}

async function checkForExiting(keyType, key) {
  if (keyType === 'userName') {
    const foundUser = await checkForExistingUsername(key)
    if (foundUser) throw new Error('This username is already in use')
  }

  if (keyType === 'email') {
    const foundUser = await checkForExistingEmail(key)
    if (foundUser) throw new Error('This email is already in use')
  }
}

module.exports = { checkForExiting }
