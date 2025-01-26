/*
 * this is the controler for activities
 */
//IMPORTS
const router = require('express').Router()
const activitySchema = require('../models/activitySchema')
const userSchema = require('../models/userSchema')

//HELPER FUNCTIONS
const { deconstructActivity } = require('../helpers/deconstructActivity')
const { filterResults } = require('../helpers/filterResults')

//get all games a kidUser has access to
router.post('/getActivities', async (req, res) => {
  try {
    console.log('get activites endpoint hit')

    //* this endpoint creates a comprehensive list of results matching the serch term and breaks those results into allowed results for the user and returns all of it to the client
    // get user id from req
    const userId = req.body.userId

    // find requesting user
    const user = await userSchema.findById(userId)

    //get all activities with one call
    const allActivities = await activitySchema.find({})

    //* get all games and activitoes

    //all games
    let allGames = filterResults(allActivities, 'game')

    //get all activites
    let allLearning = filterResults(allActivities, 'learning')

    if (!userId) {
      return res.status(200).json({
        message: `all games for no specified`,
        allGames: allGames,
        allLearning: allLearning,
      })
    }

    //* filter out allowed games and allowed learning activites

    // get allowed games for user
    let allowedGames = allGames.filter((activity) =>
      user.activitiesAccess.includes(activity._id)
    )

    //if all or all games is part of the users array allow all games
    if (['all', 'allGames'].some((el) => user.activitiesAccess.includes(el))) {
      allowedGames = allGames
    }

    // get allowed learning activities for user
    let allowedLearning = allLearning.filter((activity) =>
      user.activitiesAccess.includes(activity._id)
    )

    //if all or all games is part of the users array allow all games
    if (
      ['all', 'allLearning'].some((el) => user.activitiesAccess.includes(el))
    ) {
      allowedLearning = allLearning
    }

    return res.status(200).json({
      message: `results for ${user} `,
      allowedGames: allowedGames,
      allowedLearning: allowedLearning,
      fullResults: {
        allGames: allGames,
        allLearning: allLearning,
      },
    })
  } catch (error) {
    return res.status(500).json({
      message: `${error}`,
    })
  }
})

router.post('/addActivity', async (req, res) => {
  try {
    console.log('addActivity endpoint hit')
    console.log(req.body)
    deconstructActivity(req.body)

    // taking id out of the body
    const { _id, ...activityFields } = req.body
    //create new game
    const newGame = new activitySchema(activityFields)

    //save new game
    await newGame.save()

    return res.status(200).json({
      message: 'New game created',
      game: newGame,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: `${error}`,
    })
  }
})

router.put('/updateActivity', async (req, res) => {
  try {
    console.log('update game endpoint hit')

    deconstructActivity(req.body, 'update')

    // get activity id
    const id = req.body.id

    // find activity with id
    const foundActivity = await activitySchema.findById(id)

    // taking id out of the body
    const { _id, ...updatedFields } = req.body
    // update activity with req.body
    const updatedActivity = await activitySchema.findByIdAndUpdate(
      id,
      updatedFields,
      {
        returnDocument: 'after',
      }
    )

    return res.status(200).json({
      message: 'activity updated',

      originalDocument: foundActivity,

      updatedDocument: updatedActivity,
    })
  } catch (error) {
    return res.status(500).json({
      message: `${error}`,
    })
  }
})

router.delete('/deleteActivity', async (req, res) => {
  try {
    console.log('deleteGame endpoint hit')

    deconstructActivity(req.body, 'delete')

    // get id and delete type from body
    const id = req.body.id

    //find activity by id
    const activityFound = await activitySchema.findById(id)

    //throw error activity not found
    if (!activityFound) throw new Error(`this activity does not exist`)

    await activitySchema.findByIdAndDelete(id)

    return res.status(200).json({
      message: `Activity deleted : ${activityFound.activityTitle} `,
    })
  } catch (error) {
    return res.status(500).json({
      message: `${error}`,
    })
  }
})

module.exports = router
