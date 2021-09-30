import axios from "axios";

export default axios.create({
    baseURL: "https://http://localhost:5000/api/v1/resturants",
    headers: {
        "Content-type": "application/json"
    }
});