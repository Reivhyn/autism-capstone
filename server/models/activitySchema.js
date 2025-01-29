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
  category: { type: Array, require: true }, // the category the game belongs to
  searchKeywords: { type: Array, required: true }, //keywords that can be used to search the game
  ageRange: { type: Array, require: true }, //suggested age range for the game - search by grade grades are 1-14 to account for pre-k and kendergarten
  createdBy: {type: String}
})


module.exports = mongoose.model('activity', Activity)
