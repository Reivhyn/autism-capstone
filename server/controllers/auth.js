// IMPORTS
const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const kidUserSchema = require('../models/kidUserSchema')

//HELPER IMPORTS
//checks verifies incoming req.body
const { deconstructUser } = require('../helpers/deconstructUser')

//verifies the password chosen meets password requirements
const {
  validatePasswordCriteria,
} = require('../helpers/validatePasswordCriteria')

//checks other schema for existing email or username
const { checkForExiting } = require('../helpers/checkForExisting')

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

// Export 
module.exports = {
  deleteUser, // Export deleteUser so it can be used elsewhere in the application
};