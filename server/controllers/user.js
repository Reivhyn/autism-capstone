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
    console.log('foundKidsOfParent', foundKidsOfParent)

    // const foundParent = await userSchema.findById(id)
    // console.log('foundParent', foundParent)

    // // grab array of kids ids from parent document
    // const userKidsIdArray = foundParent.kids
    // console.log('userKidsIdArray', userKidsIdArray)

    // // create list of kids documetns from list of id's
    // const kidUsersArray = []
    // userKidsIdArray.map(async (kid) => kidUsersArray.push(await userSchema.findById(kid)))

    // console.log('kidUserArray', kidUsersArray)
    
    return res.status(200).json({foundKidsOfParent})
  } catch (error) {
    return res.status(500).json({
      message: `${error}`,
    })
  }
})

module.exports = router