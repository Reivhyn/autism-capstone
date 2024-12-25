const { default: mongoose } = require('mongoose')

const Game = new mongoose.Schema({
  gameTitle: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  imageURL: { tpe: string }, //if the image is from a url
  imagebuffer: { type: Buffer }, //if the image is stored in the database
  imageType: { type: String, required: true }, // contains the type eg (url, jpeg, none)
  educational: { type: Boolean, required: true }, //if the game is educational it can appear in the learning section as well
})
