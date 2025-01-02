//get all games a kidUser has access to
router.get('/getActivities', async (req, res) => {
  try {
    //* this endpoint should take the kiduser id reference it and return the games that are available to it

    //TODO make function with upper and lower case OR all game titles must be lower case

    console.log('get-games: allowed games endpoint hit')

    const userId = req.body.userId

    const searchTerm = req.body.searchTerm

    const foundUser = await userSchema.findById(userId)
    console.log('foundUser', foundUser)

    //searchfor and return a title if found
    let titleResult = await activitySchema.findOne({
      gameTitle: { $regex: searchTerm, $options: 'i' },
    })

    if (!titleResult) titleResult = 'No title found'

    //search for titles with that keyword
    let keywordResult = await activitySchema.find({ searchKeywords: searchTerm })
    console.log('keywordResult', keywordResult)

    //filters list down to allowe results
    let allowedResults = keywordResult.filter((el) =>
      foundUser.gamesAccess.some((access) => el.searchKeywords.includes(access))
    )

    if (keywordResult.length === 0)
      keywordResult = 'No titles with that keyword found'

    if (allowedResults.length === 0) allowedResults = 'No allowed results found'

    //allows all results if the user has all in their access
    if (foundUser.gamesAccess.includes('all')) allowedResults = keywordResult

    console.log('allowedResults', allowedResults)

    return res.status(200).json({
      message: 'search results',
      gameTitles: titleResult,
      keywordResult: keywordResult,
      allowedResults: allowedResults,
    })
  } catch (error) {
    return res.status(500).json({
      message: `${error}`,
    })
  }
})