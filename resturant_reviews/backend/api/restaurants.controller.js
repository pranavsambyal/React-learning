import { response } from "express";
import RestaurantsDOA from "../DAO/restaurantsDAO.js";

export default class ResturantsController {
    static async apiGetRestaurants(req, res, next) {
        // Check if restaurantPerPage exists if yes parse it as int if no pass 20
        const restaurantsPerPage = req.query.restaurantsPerPage ? parseInt(req.query.restaurantsPerPage, 10) : 20
        // Check if page exists if yes parse it as int if no pass 0
        const page = req.query.page ? parseInt(req.query.page, 10) : 0

        //Initlize properties with their appropiate query data
        let filters = {}
        if (req.query.cuisine) {
            filters.cuisine = req.query.cuisine
        }
        else if (req.query.zipcode) {
            filters.zipcode = req.query.zipcode
        }
        else if (req.query.name) {
            filters.name = req.query.name
        }
        //Call to get data form DB using DOA Function
        const { restaurantsList, totalNumRestaurants } = await RestaurantsDOA.getRestaurnats({
            filters,
            page,
            restaurantsPerPage
        })
        //Responce Object to return 
        let responce = {
            restaurant: restaurantsList,
            page: page,
            filters: filters,
            entries_per_page: restaurantsPerPage,
            total_results: totalNumRestaurants,
        }
        res.json(responce)
    }

    static async apiGetRestaurantById(req, res, next) {
        try {
            let id = req.params.id || {}
            let restaurant = await RestaurantsDOA.getRestaurantByID(id)
            if (!restaurant) {
                res.status(404).json({ error: "Not Found" })
                return
            }
            res.json(restaurant)
        } catch (err) {
            console.log(`api,${err}`)
            res.status(500).json({ error: err })
        }
    }
    apiGetRestaurantCuisines
    static async apiGetRestaurantCuisines(req, res, next) {
        try {
            let cuisines = await RestaurantsDOA.getCuisines()
            res.json(cuisines)
        } catch (err) {
            console.log(`api,${err}`)
            res.status(500).json({ error: err })
        }
    }
}