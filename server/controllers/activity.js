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
const { conciseResults } = require('../helpers/conciseResults')

//get all games a kidUser has access to
router.post('/getActivities', async (req, res) => {
  try {
    console.log('get activites endpoint hit')

    //* this endpoint creates a comprehensive list of results matching the serch term and breaks those results into allowed results for the user and returns all of it to the client
    // get user id from req
    const userId = req.body.userId

    // find requesting user
    const user = await userSchema.findById(userId)
    const searchTerm = req.body.searchTerm

    //get all activities with one call
    const allActivities = await activitySchema.find({})

    //TODO REMOVE code for id's
    const activityIds = []

    allActivities.forEach((el) => activityIds.push(el._id))

    //* games section has all logic for game search results

    //all games
    let allGames = filterResults(allActivities, searchTerm, 'game')

    // get all games matching title
    let gameTitleSearchResults = filterResults(allGames, searchTerm, 'title')

    // get all games matching keyword
    let gameKeywordSearchResults = filterResults(
      allGames,
      searchTerm,
      'keyWord'
    )

    // get all games matching age range
    let gamesAgeRangeSearchResults = filterResults(allGames, searchTerm, 'age')

    //merges all the different results and removes duplicates
    let conciseGames = conciseResults([
      gameTitleSearchResults,
      gameKeywordSearchResults,
      gamesAgeRangeSearchResults,
    ])

    // get allowed games for user
    let allowedGames = conciseGames.filter((activity) =>
      user.activitiesAccess.includes(activity._id)
    )

    //if all or all games is part of the users array allow all games
    if (['all', 'allGames'].some((el) => user.activitiesAccess.includes(el))) {
      allowedGames = conciseGames
    }

    //* learning activities section

    //get all activites
    let allLearning = filterResults(allActivities, searchTerm, 'learning')

    // get all learning activities matching title
    let learningTitleSearchResults = filterResults(
      allLearning,
      searchTerm,
      'title'
    )

    // get all learning activities matching keyword
    let learningKeywordSearchResults = filterResults(
      allLearning,
      searchTerm,
      'keyWord'
    )

    // get all activities matching age range
    let learningAgeRangeSearchResults = filterResults(
      allLearning,
      searchTerm,
      'age'
    )

    //merges all the different results and removes duplicates
    let conciseLearning = conciseResults([
      learningTitleSearchResults,
      learningKeywordSearchResults,
      learningAgeRangeSearchResults,
    ])

    //? get allowed learning activities for user
    let allowedLearning = conciseLearning.filter((activity) =>
      user.activitiesAccess.includes(activity._id)
    )

    //if all or all games is part of the users array allow all games
    if (
      ['all', 'allLearning'].some((el) => user.activitiesAccess.includes(el))
    ) {
      allowedLearning = conciseLearning
    }

    return res.status(200).json({
      message: 'search results',
      searchTerm: searchTerm,
      allowedGames: allowedGames,
      allowedLearning: allowedLearning,
      fullResults: {
        conciseGames: conciseGames,
        conciseLearning: conciseLearning,
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

    deconstructActivity(req.body)

    //create new game
    const newGame = new activitySchema(req.body)

    //save new game
    await newGame.save()

    return res.status(200).json({
      message: 'New game created',
      game: newGame,
    })
  } catch (error) {
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

    // update activity with req.body
    const updatedActivity = await activitySchema.findByIdAndUpdate(
      id,
      req.body,
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
    const deleteType = req.body.deleteType // should be 'game' or 'learning activity'

    //find activity by id
    const activityFound = await activitySchema.findById(id)

    //throw error activity not found
    if (!activityFound) throw new Error(`this ${deleteType} does not exist`)

    await activitySchema.findByIdAndDelete(id)

    return res.status(200).json({
      message: `Game deleted : ${activityFound.activityTitle} `,
    })
  } catch (error) {
    return res.status(500).json({
      message: `${error}`,
    })
  }
})

module.exports = router
