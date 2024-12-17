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
const {MongoClient} = require('mongodb')
const express = require('express')
// const {validateSession} = require('./middlewares/session') //TODO need some version of authentication
const {connectToDatabase} = require('./helpers/connectDatabase')
const cookieParser = require('cookie-parser')

// const session = require("express-session")
//import cors to allow cross origin request
// const cors = require('cors'); //? We may need this?

//GLOBALS
const app = express()
const PORT = process.env.PORT
const HOST = process.env.HOST

//MIDDLEWARES

// allow cross origin requests only from a specific origin
// app.use(cors({ origin: 'http://127.0.0.1:5173', credentials: true})); //? we may need??
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


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