/*
 *This helper looks for a user by id in eachof the user schemas
 */

//IMPORTS
const kidUserSchema = require('../models/kidUserSchema')
const parentUserSchema = require('../models/parentUserSchema')
const adminUserSchema = require('../models/adminUserSchema')

async function findUser(userId) {
  let foundUser = await kidUserSchema.findById(userId)
  if (foundUser) return foundUser

  foundUser = await parentUserSchema.findById(userId)
  if (foundUser) return foundUser

  foundUser = await adminUserSchema.findById(userId)
  if (foundUser) return foundUser

  throw new Error('Forbidden')
}

module.exports = { findUser }
