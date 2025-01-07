/* 
    ? Model-View-Controller (MVC)
    * architecture or system design style
    * breaks full stack application into:
        * model (data - ex: database)
        * view (client - ex: browser or Postman)
        * controller (logic - ex: endpoints)
    * we use MVC for Separation of Concerns
*/

//IMPORTS
require('dotenv').config()
const { MongoClient } = require('mongodb')
const express = require('express')
// const {validateSession} = require('./middlewares/session') //TODO need some version of authentication
const { connectToDatabase } = require('./helpers/connectDatabase')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const cors = require('cors')

//CONTROLER IMPORTS
const authController = require('./controllers/auth')
const activitiesController = require('./controllers/activity')


// const session = require("express-session")
//import cors to allow cross origin request
// const cors = require('cors'); //? We may need this?

//GLOBALS
const app = express()
const PORT = process.env.PORT
const HOST = process.env.HOST
const SESSION_KEY = process.env.SESSION_KEY

//MIDDLEWARES

// allow cross origin requests only from front end
app.use(cors({ origin: 'http://127.0.0.1:5174', credentials: true}))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/auth', authController)
app.use('/activities', activitiesController)


// set server to listen and connect to local DB
app.listen(PORT, HOST, () => {
  connectToDatabase()
  console.log(`[server] listening on ${HOST}:${PORT}`)
})

/* 
    ? Model-View-Controller (MVC)
    * architecture or system design style
    * breaks full stack application into:
        * model (data - ex: database)
        * view (client - ex: browser or Postman)
        * controller (logic - ex: endpoints)
    * we use MVC for Separation of Concerns
*/
