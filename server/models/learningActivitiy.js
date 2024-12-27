const { default: mongoose } = require("mongoose");

const LearningActivity = new mongoose.Schema({
  activityTitle: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  imageURL: { tpe: string }, //if the image is from a url
  imagebuffer: { type: Buffer }, //if the image is stored in the database
  imageType: { type: String, required: true }, // contains the type eg (url, jpeg, none)
})