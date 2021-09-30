// Importing all modules that will be used in the app
import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import RestaurantsDOA from "./DAO/restaurantsDAO.js";
import ReviewsDAO from "./DAO/reviewsDAO.js";

// Config for Dotenv to load env variabls 
dotenv.config()

// MongoClient object to access the DB 
const MongoClient = mongodb.MongoClient

// Accessing port from env file by using process.env.OBJECTNAME
// Specifing or case if PORT number is busy 
const port = process.env.PORT || 8000

// Connect to database by passing on uri and options.
//pollSize (max concurent connections),
//wtimeout (time in ms till timeout ),

MongoClient.connect(
    process.env.RESTREVIEWS_DB_URI,
    {
        maxPoolSize: 50,
        wtimeoutMS: 2500,
        useNewUrlParser: true
    })
    .catch(err => {
        console.error(err.stack)
        process.exit(1)
    })
    .then(async client => {
        await RestaurantsDOA.injectDB(client)
        await ReviewsDAO.injectDB(client)
        app.listen(port, () => {
            console.log(`Listening on port ${port}`)
        })
    })