// Importing all modules that will be used in the app
import express from "express"
import cors from "cors"
import restaurants from "./api/restaurants.route.js";

// Declearing the app itself
const app = express()

// Declearing modules used by the  app 
app.use(cors())
app.use(express.json())

//Specifing main Address where the app will be served along with route file
app.use("/api/v1/resturants", restaurants)
// Error message to display if any other route is requested
app.use("*", (req, res) => res.status(404).json({ Error: "Not Found"}))

export default app