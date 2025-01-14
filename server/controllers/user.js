const router = require('express').Router()

const { deconstructUser } = require('../helpers/deconstructUser');
//SCHEMA IMPORT
const userSchema = require('../models/userSchema')

router.post('/findKidsOfParent', async (req, res) => {
  try {
    console.log('findKidsOfParent endpint hit');

    deconstructUser(req.body, 'findKidsOfParent')

    // get parent user id
    const id = req.body.id

    const foundKidsOfParent = await userSchema.find({parentUser: id})
    
    return res.status(200).json({foundKidsOfParent})
  } catch (error) {
    return res.status(500).json({
      message: `${error}`,
    })
  }
})

router.post('/getAllUsers', async (req, res) =>{

  try {
    console.log('getAllUsers endpoint hit');
    
    // verify user is an admin
    if(req.body.userType !== 'admin') throw new Error("Request Denied");
    
    const allUsers = await userSchema.find({})

    return res.status(200).json({allUsers})
    
  } catch (error) {
    return res.status(500).json({
      message: `${error}`,
    })
  }
})

module.exports = router