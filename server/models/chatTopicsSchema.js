const { Mongoose, default: mongoose } = require("mongoose");

const ChatTopic = new mongoose.Schema({
  topicTitle: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  ageRange: {type: String, require: true}, //suggested age range for the topic
})

module.exports = mongoose.model('chatTopic', ChatTopic)