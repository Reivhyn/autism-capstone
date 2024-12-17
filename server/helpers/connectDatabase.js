require('dotenv').config()
const { mongoose } = require('mongoose');
const URI = process.env.URI

// Create a MongoClient with a MongoClientOptions object to set the Stable API version

async function connectToDatabase() {
  try {
    mongoose.set('debug', true)
    // Connect the client to the server	(optional starting in v4.7)
    await mongoose.connect(URI);
    // Send a ping to confirm a successful connection
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.log(error)
  }
}
// connectToDatabase().catch(console.dir);

module.exports = {connectToDatabase, mongoose}

