import mongodb from "mongodb"

//Get object id from Mongodb
const ObjectId = mongodb.ObjectId

// Create a variable that will be use used to a reference to our database 
let restaurants

//Expot class 
export default class RestaurantsDOA {
    // Method to connect to DB
    static async injectDB(conn) {
        if (restaurants) {
            return
        }
        try {
            restaurants = await conn.db(process.env.RESTREVIEWS_NS).collection("restaurants")
        } catch (err) {
            console.error(`Unable to get collection handler in restaurantsDOA: ${err}`)
        }
    }

    //query={"DB.field":{$eq(condition): filters["key to search"]}}
    //Method which will be called to get data from DB
    static async getRestaurnats({
        filters = null,
        page = 0,
        restaurantsPerPage = 20,
    } = {}) {
        let query
        if (filters) {
            //Filter based of name of rest. text search for that name
            //Here as database field is not specified , so its specified in Atlas
            //So if a text seach is made which fields from the DB will be searched
            //for that specific string 
            if ("name" in filters) {
                query = { $text: { $search: filters["name"] } }
            }
            //Filter based on cuisine based on equality with filters["cuisine"]
            else if ("cuisine" in filters) {
                query = { "cuisine": { $eq: filters["cuisine"] } }
            }
            //Filter based on zipcode based on equality with filters["zipcode"]
            else if ("zipcode" in filters) {
                query = { "address.zipcode": { $eq: filters["zipcode"] } }
            }
        }
        let cursor
        //Try to query the DB on the query 
        try {
            cursor = await restaurants
                .find(query)
        } catch (err) {
            console.error(`Unable to issue find command,${err}`)
            return { restaurantsList: [], totalNumRestaurants: 0 }
        }

        //Decleare a cursor with page limit and also skip to the given page number
        const displayCursor = cursor.limit(restaurantsPerPage).skip(restaurantsPerPage * page)

        //Decleare restList to an array and totalnum to a var and check if any error is found
        try {
            const restaurantsList = await displayCursor.toArray()
            const totalNumRestaurants = await restaurants.countDocuments(query)

            return { restaurantsList, totalNumRestaurants }
        } catch (err) {
            console.error(`Unable to convert cursor to array or problem counting document,${err}`)
            return { restaurantsList: [], totalNumRestaurants: 0 }
        }
    }
    static async getRestaurantByID(id) {
        try {
            //Creat a pipline to match different collections together
            const pipeline = [
                {
                    $match: {
                    _id:new ObjectId(id),
                    },
                },
                {
                    //lookup other items to add to the result
                    //Part of mongobd's aggrigation pipeline
                    $lookup: {
                        from: "reviews",
                        let: {
                            id:"$_id",
                        },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $eq:["$restaurant_id","$$id"],
                                    },
                                },
                            },
                            {
                                $sort: {
                                    date:-1,
                                },
                            },
                        ],
                        as:"reviews",
                    },
                },
                {
                    $addFields: {
                        reviews:"$reviews",
                    },
                },
            ]
            return await restaurants.aggregate(pipeline).next()
        } catch (err) {
            console.error(`Something went wroung in getReastaurntByID: ${err}`)
            throw err
        }
        
    }
    static async getCuisines() {
        let cuisines = []
        try {
            cuisines = await restaurants.distinct("cuisine")
            return cuisines
        }catch (err) {
            console.error(`Unable to get cuisines, ${err}`)
            return cuisines
        }
    }
}
