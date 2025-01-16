const { mongo, default: mongoose } = require('mongoose')

const User = new mongoose.Schema(
  {
    //UNIVERSAL section of schema
    userType: { type: String, require: true }, // admin ,parent or kid
    userName: { type: String, required: true, unique: true },
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
    parentUser: { type: String}, //if parent it value is parent otherwise it is the id of the parent user
    activitiesAccess: { type: Array },
    
    // if the kid is disable they should not be able to log in
    disabled: {type: Boolean},
    /* 
      contains the id of activities the user has access to
      if it contains all then all gmaes and activities are available
      if it  contains allLearning then all learning will be available
      if it contains allGames then all games will be avalable
    */
    chatAccess: { type: Array }, //should list the ids of available chat topics

    //LOCKOUT section
    failedAttempts: { type: Number, default: 0 },
    lockedOut : {type: Boolean, default: false},
    lockOutTime : {type: Date}
  },
  { Timestamp: true }
)

// Middleware to set `userNameLower` before saving
User.pre('save', function (next) {
  if (this.isModified('userName')) {
    this.userNameLower = this.userName.toLowerCase() // Convert userName to lowercase

    if (this.isModified('email')) {
      this.email = this.email.toLowerCase() // convert email to lower case
    }
  }

  if(this.failedAttempts === 4){
    this.lockedOut = true
    this.lockOutTime = Date.now
  }
  next()
})

module.exports = mongoose.model('user', User)
