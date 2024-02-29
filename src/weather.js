import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import hum from "./humidity-svgrepo-com.svg";
import wind from "./wind-svgrepo-com.svg";

function WeatherApp() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("Puducherry");
  const [locationError, setLocationError] = useState(false); 
  const locationInputRef = useRef(null);

  const API_KEY = "5e833915aab47a607ecf4d50d908e0ae";

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`;

  const fetchData = (searchLocation) => {
    axios
      .get(url)
      .then((response) => {
        if (response.data.code && response.data.code === "404") {
          
          setLocationError(true);
        } else {
          setData(response.data);
          setLocationError(false); 
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLocationError(true); 
      });
  };

  
  const handleSearch = () => {
    fetchData(location);
  };

  useEffect(() => {
    fetchData(location);
  },[]); 

  const handleLocationInputClick = () => {
    if (locationInputRef.current) {
      console.log(locationInputRef.current)
      locationInputRef.current.select();
    }
  };

  return (
    <div className="app w-1/3 bg-gradient-to-b from-blue-200 to-blue-300 rounded-lg shadow-lg p-6">
      <div className="search flex justify-center items-center mb-8">
        <input
          ref={locationInputRef}
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onClick={handleLocationInputClick}
          placeholder="Enter Location"
          type="text"
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 bg-white shadow-sm w-3/4"
        />
        <button
          onClick={handleSearch}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-600"
        >
          Search
        </button>
      </div>
      <div className="container mx-auto">
        <div className="top bg-gray-200 rounded-md p-4">
          {locationError ? (
            <p className="text-red-500">Location does not exist</p>
          ) : (
            <div>
              <div className="location mb-4">
                <p className="text-2xl font-semibold">{data.name}</p>
              </div>
              <div className="temp">
                {data.main ? (
                  <h1 className="text-6xl font-bold">
                    {data.main.temp.toFixed()}°C
                  </h1>
                ) : null}
              </div>
              <div className="description mt-4">
                {data.weather ? (
                  <p className="text-lg">{data.weather[0].main}</p>
                ) : null}
              </div>
            </div>
          )}
        </div>

        {data.name !== undefined && !locationError && (
          <div className="bottom mt-8">
            <div className="flex justify-between">
              <div className="humidity">
                {data.main ? (
                  <div>
                    <p className="text-lg font-semibold pl-1">
                      {data.main.humidity}%
                    </p>
                    <div className="flex">
                      <img src={hum} alt="humidity icon" width="18px" />
                      <p className="text-sm">Humidity</p>
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="wind">
                {data.wind ? (
                  <div>
                    <p className="text-lg font-semibold">
                      {data.wind.speed.toFixed()} MPH
                    </p>
                    <div className="flex">
                      <img src={wind} width="18px" />
                      <p className="text-sm ml-1">Wind Speed</p>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default WeatherApp;
