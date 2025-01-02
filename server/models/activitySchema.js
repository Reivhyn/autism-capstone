/* 
  * this schema handles games and learning activities. activityTpe determins the type
*/

const { default: mongoose } = require('mongoose')

const Activity = new mongoose.Schema({
  activityType: {type: String, required:true}, // shoould be 'game' or 'learning'
  activityTitle: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  url: { type: String },
  imageURL: { type: String }, //if the image is from a url
  imagebuffer: { type: Buffer }, //if the image is stored in the database
  imageType: { type: String, required: true }, // contains the type eg (url, jpeg, none)
  category: { type: Array, require: true }, // the category the game belongs to
  educational: { type: Boolean, required: true }, //if the game is educational it can appear in the learning section as well
  searchKeywords: { type: Array, required: true }, //keywords that can be used to search the game
  ageRange: { type: Array, require: true }, //suggested age range for the game - search by grade
})


module.exports = mongoose.model('activity', Activity)
