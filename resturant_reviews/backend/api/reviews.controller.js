import ReviewsDAO from "../DAO/reviewsDAO.js"

//ReviewsController Class to reside all function on reviews
export default class ReviewsController {
    static async apiPostReview(req, res, next) {
        try {
            //Get required data from body of post request 
            const restaurantId = req.body.restaurant_id
            const review = req.body.text
            const userInfo = {
                name: req.body.name,
                _id: req.body.user_id
            }
            const date = new Date()

            //Pass retrived data to the database using function defined as
            //ReviewsDAO.addReview()
            const ReviewResponse = await ReviewsDAO.addReview(
                restaurantId,
                userInfo,
                review,
                date,
            )
            res.json({ status: "Success" })
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }
    static async apiUpdateReview(req, res, next) {
        try {
            //Get required data from body of request 
            const reviewId = req.body.review_id
            const text = req.body.text
            const date = new Date()

            //Pass retrived data to the database using function defined as
            //ReviewsDAO.updateReview()
            const reviewResponse = await ReviewsDAO.updateReview(
                reviewId,
                req.body.user_id,
                text,
                date,
            )

            var { error } = reviewResponse
            if (error) {
                res.status(400).json({ error })
            }
            if (reviewResponse.modifyCount === 0) {
                throw new Error(
                    "unable to update review - user may not be original poster",
                )
            }
            res.json({ status: "Success" })
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }
    static async apiDeleteReview(req, res, next) {
        try {
            //Get required data from body of post request 
            //Get qurey.id parameter from the url 
            const reviewId = req.query.id
            const userId = req.body.user_id

            //Log on console
            console.log(reviewId)

            //Pass retrived data to the database using function defined as
            //ReviewsDAO.deleteReview()
            const reviewResponse = await ReviewsDAO.deleteReview(
                reviewId,
                userId,
            )
            res.json({ status: "Success" })
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }
}