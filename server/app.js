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

//CONTROLER IMPORTS
const parentAuthController = require('./controllers/parentAuth')
const adminAuthControler = require('./controllers/adminAuth')
const kidAuthControler = require('./controllers/kidAuth')
const gamesController = require('./controllers/games')

// const session = require("express-session")
//import cors to allow cross origin request
// const cors = require('cors'); //? We may need this?

//GLOBALS
const app = express()
const PORT = process.env.PORT
const HOST = process.env.HOST
const SESSION_KEY = process.env.SESSION_KEY

//MIDDLEWARES
app.use(
  session({
    secret: SESSION_KEY,
    resave: false, // Avoid resaving session data unless modified
    saveUninitialized: true, // Save new sessions even if they're empty
    cookie: { secure: false }, // Use secure: true if using HTTPS
  })
)

// allow cross origin requests only from a specific origin
// app.use(cors({ origin: 'http://127.0.0.1:5173', credentials: true})); //? we may need??
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/parentAuth', parentAuthController)
app.use('/adminAuth', adminAuthControler)
app.use('/kidAuth', kidAuthControler)
app.use('/games', gamesController)

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
