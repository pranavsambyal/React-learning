import mongodb from "mongodb"

//Get object id from Mongodb
const ObjectId = mongodb.ObjectId

//Empty placeholder for reference to reviews collection 
let reviews

export default class ReviewsDAO {
    // Method to connect to DB
    static async injectDB(conn) {
        //see if obj exists if yes return
        if (reviews) {
            return
        }
        //if no, try to get reference of the object from DB
        try {
            //In mongo if a collection doesnot exists the a new colection 
            //for the same is created whenever we try to insert a document to it 
            reviews = await conn.db(process.env.RESTREVIEWS_NS).collection("reviews")
        } catch (err) {
            console.error(`Unable to get collection handler in userDOA: ${err}`)
        }
    }
    //addReview Function 
    static async addReview(restaurantId, user, review, date) {
        try {
            //Review Doc to pass to the collection
            const reviewDoc = {
                name: user.name,
                user_id:user._id,
                date: date,
                text: review,
                restaurant_id: ObjectId(restaurantId),
            }
            //passing doc to collection
            return await reviews.insertOne(reviewDoc)
        } catch (err) {
            console.error(`Unable to post review: ${err}`)
            return { error: err }
        }
    }
    //updateReview Function 
    static async updateReview(reviewId, userId, text, date) {
        try {
            //update the review if it is made by same user
            const updateResponse = await reviews.updateOne(
                //condition to check
                { user_id: userId, _id: ObjectId(reviewId) },
                //if true what to update
                { $set: { text: text, date: date } },
            )
            return updateResponse
        } catch (err) {
            console.error(`Unable to update review: ${err}`)
            return { error: err }
        }
    }
    //deleteReview Function 
    static async deleteReview(reviewId, userId) {
        try {
            //Detete the review if it is made by same user
            const deteteResponse = await reviews.deleteOne(
                //condition to check if met delete
                {
                    _id: ObjectId(reviewId),
                    user_id: userId,
                })
            return deleteResponse
        } catch (err) {
            console.error(`Unable to detete review: ${err}`)
            return { error: err }
        }
    }
}
