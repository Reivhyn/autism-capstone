const { Mongoose, default: mongoose } = require('mongoose')

const ChatTopic = new mongoose.Schema({
  topicTitle: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  createdBy: { type: String },
})

module.exports = mongoose.model('chatTopic', ChatTopic)
