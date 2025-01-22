// IMPORTS
const router = require('express').Router()
const { json } = require('express')
const { deconstructChatTopic } = require('../helpers/deconstructChatTopic')

// SCHEMA IMPORT
const chatTopicSchema = require('../models/chatTopicsSchema')

router.post('/creatChatTopic', async (req, res) => {
  try {
    console.log('create chat endpoint hit')
    console.log('req.body', req.body)

    deconstructChatTopic(req.body)

    // create new chat topic
    const newChat = new chatTopicSchema(req.body)

    //save new chat topic
    await newChat.save()
  } catch (error) {
    return res.status(500).json({
      message: `${error}`,
    })
  }
})

router.get('/getAllChatTopics', async (req, res) => {
  try {
    console.log('getAllChatTipics endpoint hit')

    const allChatTopics = await chatTopicSchema.find({})

    return res.status(200).json({ allChatTopics })
  } catch (error) {
    return res.status(500).json({
      message: `${error}`,
    })
  }
})

router.post('/updateChatTopic', async (req, res) => {
  try {
    console.log('updateChatTopic endpoint hit')

    deconstructChatTopic(req.body, 'update')

    // get id
    const id = req.body.id

    // find chat topic with id
    const foundTopic = await chatTopicSchema.findById(id)

    /* remove the id from the body otherwise mongo throws an error
    it thinks your trying to update _id */
    const {_id, ...updateFields} =req.body

    //update acticity with req.body
    const updatedTopic = await chatTopicSchema.findByIdAndUpdate(id, updateFields, {
      returnDocument: 'after',
    })

    return res.status(200).json({
      message: 'Chat topic updated',

      originalDocument: foundTopic,

      updatedDocument: updatedTopic,
    })
  } catch (error) {
    console.log('error', error)
    return res.status(500).json({
      message: `${error}`,
    })
  }
})

router.delete('/deleteTopic', async (req, res) => {
  try {
    console.log('deleteTopic endpoint hit')

    deconstructChatTopic(req.body, 'delete')

    const id = req.body.id

    //find topic by id
    const foundTopic = await chatTopicSchema.findById(id)

    //throw error if topic not found
    if (!foundTopic) throw new Error('this chat topic does not exist')

    // delete if found
    await chatTopicSchema.findByIdAndDelete(id)

    return res.status(200).json({
      message: `Chat topic deleted : ${foundTopic.topicTitle} `,
    })
  } catch (error) {
    return res.status(500).json({
      message: `${error}`,
    })
  }
})

module.exports = router
