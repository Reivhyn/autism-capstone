// IMPORTS
const router = require('express').Router()
const { GoogleGenerativeAI } = require('@google/generative-ai')
const { json } = require('express')

// GLOBAL IMPORTS
const GEMINI = process.env.GEMINI

// Globals
const genAI = new GoogleGenerativeAI(GEMINI)
const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
  systemInstruction: 'You are an instructor. Your name is Bob. You can only teach about animals, all other subjects are forbidden',
})

router.post('/gemini', async (req, res) => {
  try {
    const prompt = req.body.prompt
    const history = req.body.history || []

    //start chat
    const chat = model.startChat({
      history: history,
    })

    try {
      // Set the response header to indicate a stream and send heders immediatly
      res.setHeader('Content-Type', 'text/plain;charset=utf-8')
      res.flushHeaders()

      let newReply = ''
      let result = await chat.sendMessageStream(prompt)
      for await (const chunk of result.stream) {
        const chunkText = chunk.text()
        newReply = newReply + chunkText
        res.write(`TEXT: ${chunkText}`)
      }

      // update history with user prompt
      history.push({ role: 'user', parts: [{ text: prompt }] })

      // update history with gemini response
      history.push({ role: 'model', parts: [{ text: newReply }] })

      res.write('JSON' + JSON.stringify(history) + '\n')

      res.end()
    } catch (error) {
      res.write(`**** AN ERROR OCCURED***\n ${error}`)
      res.end()
    }
  } catch (error) {
    return res.status(500).json({
      message: `${error}`,
    })
  }
})

module.exports = router
