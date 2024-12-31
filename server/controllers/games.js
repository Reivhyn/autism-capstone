/*
 * this is the controler for games
 */
//IMPORTS
const router = require('express').Router()
const gamesSchema = require('../models/gamesSchema')
const kidUserSchema = require('../models/kidUserSchema')

//HELPER FUNCTIONS
const { deconstructGame } = require('../helpers/deconstructGame')

//get all games a kidUser has access to
router.get('/getGames', async (req, res) => {
  try {
    //* this endpoint should take the kiduser id reference it and return the games that are available to it

    //TODO make function with upper and lower case OR all game titles must be lower case

    console.log('get-games: allowed games endpoint hit')

    const userId = req.body.userId

    const searchTerm = req.body.searchTerm

    const foundUser = await kidUserSchema.findById(userId)
    console.log('foundUser', foundUser)

    //searchfor and return a title if found
    const nameResult = await gamesSchema.findOne({ gameTitle: searchTerm })
    console.log('nameResults', nameResult)

    //search for titles with that keyword
    const keywordResult = await gamesSchema.find({ searchKeywords: searchTerm })
    console.log('keywordResult', keywordResult)

    const allowedResults = keywordResult.filter((el) =>
      foundUser.gamesAccess.some((access) => el.searchKeywords.includes(access))
    )

    console.log('allowedResults', allowedResults)

    return res.status(200).json({
      message: 'search results',
    })
  } catch (error) {
    return res.status(500).json({
      message: `${error}`,
    })
  }
})

router.post('/addGame', async (req, res) => {
  try {
    console.log('addGame endpoint hit')

    deconstructGame(req.body)

    const newGame = new gamesSchema(req.body)

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

router.put('/update-game', (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({
      message: `${error}`,
    })
  }
})

router.delete('/deleteGame', async (req, res) => {
  try {
    console.log('deleteGame endpoint hit')

    deconstructGame(req.body, 'delete')

    const gameTitle = req.body.gameTitle

    const gameFound = await gamesSchema.findOne({ gameTitle: gameTitle })

    if (!gameFound) throw new Error('this game does not exist')

    await gamesSchema.findOneAndDelete({ gameTitle: gameTitle })

    return res.status(200).json({
      message: `Game deleted : ${gameTitle} `,
    })
  } catch (error) {
    return res.status(500).json({
      message: `${error}`,
    })
  }
})

console.log();

module.exports = router
