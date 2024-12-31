const { mongo, default: mongoose } = require('mongoose')

const User = new mongoose.Schema(
  {
    //UNIVERSAL section of schema
    userType: { type: String, require: true }, // admin ,parent or kid
    userName: { type: String, required: true, unique: true },
<<<<<<< HEAD
=======
    userNameLower: {type: String}, // lowercase username for searching
>>>>>>> develop
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dob: { type: Date, required: true },
    email: {
      type: String,
      maxLength: 48,
      required: true,
      unique: true,
      match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    },
    password: { type: String, required: true },

    // PARENT section of schema
    kids: { type: Array },

    // KID section of schema
    parentUser: { type: String, required: true }, //if parent it value is parent otherwise it is the id of the parent user
    gamesAccess: { type: Array }, //should list the id of available games
    chatAccess: { type: Array }, //should list the ids of available chat topics
    learningAccess: { type: Array }, //should list the ids of available learning topics
  },
  { Timestamp: true }
)

<<<<<<< HEAD
module.exports = mongoose.model('user', User)
=======
// Middleware to set `userNameLower` before saving
User.pre('save', function (next) {
  if (this.isModified('userName')) {
    this.userNameLower = this.userName.toLowerCase(); // Convert userName to lowercase

    if(this.isModified('email')){
      this.email = this.email.toLowerCase() // convert email to lower case
    }
  }
  next();
});

module.exports = mongoose.model('user', User)
>>>>>>> develop
