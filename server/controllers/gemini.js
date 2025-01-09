// IMPORTS
const router = require('express').Router()

//HELPER FUNCTIONS
const { callGemini } = require('../helpers/callGemeni')

router.post('/gemini', async (req, res) => {
  try {

    prompt = req.body.prompt

    console.log('gemini endpoint hit')
  
    const result = await callGemini(prompt)
  
    res.status(200).json(result)
    
  } catch (error) {
    return res.status(500).json({
      message: `${error}`,
    })
  }
})

module.exports = router
