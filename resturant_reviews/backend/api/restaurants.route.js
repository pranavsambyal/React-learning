// Importing all modules that will be used in the app
import express from "express"
import RestaurtantCtrl from "./restaurants.controller.js"
import ReviewsCtrl from "./reviews.controller.js";

// Access Express router 
const router = express.Router()

// Adding routes in the file
router.route("/").get(RestaurtantCtrl.apiGetRestaurants)
//Get specific restaraunt with the Id along with its reviews
router.route("/id/:id").get(RestaurtantCtrl.apiGetRestaurantById)
//Get list of all cusines available at that restaraunt
router.route("/cuisines").get(RestaurtantCtrl.apiGetRestaurantCuisines)

//Route for people to post ,put , delete their reviews
router.route("/review")
    .post(ReviewsCtrl.apiPostReview)
    .put(ReviewsCtrl.apiUpdateReview)
    .delete(ReviewsCtrl.apiDeleteReview)



//Exporting router object  
export default router