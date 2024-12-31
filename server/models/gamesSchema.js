const { default: mongoose } = require('mongoose')

const Game = new mongoose.Schema({
  gameTitle: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  url: { type: String },
  imageURL: { tpe: String }, //if the image is from a url
  imagebuffer: { type: Buffer }, //if the image is stored in the database
  imageType: { type: String, required: true }, // contains the type eg (url, jpeg, none)
  category: { type: String, require: true }, // the category the game belongs to
  educational: { type: Boolean, required: true }, //if the game is educational it can appear in the learning section as well
  searchKeywords: { type: Array, required: true }, //keywords that can be used to search the game
  ageRange: { type: String, require: true }, //suggested age range for the game
})

module.exports = mongoose.model('game', Game)
