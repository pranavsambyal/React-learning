import React, { useState, useEffect } from "react";
import RestrauntDataService from "../services/restaurant";
import { Link } from "react-router-dom";

const restaurantsList = (props) => {
  const [restaurants, setRestaurants] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchZip, setSearchZip] = useState("");
  const [searchCuisine, setSearchCuisine] = useState("");
  const [cuisines, setCuisines] = useState(["All Cuisines"]);
  
  return <div className="App">Restaurnats List,</div>;
};

export default restaurantsList;
