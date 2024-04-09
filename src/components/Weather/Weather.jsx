import React, { useState } from "react";
import axios from 'axios';

import './../../index-weather.css';

console.log("in Weather.jsx::outside of the Weather component");

export default function Weather() { 
    console.log("in Weather.jsx::beginning of component");

    const [data, setData] = useState("");
    const [location, setLocation] = useState("");

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=0c0aa909068afe8c032d27e5c4cdf47c`;

    const searchLocation = (event) => {
        console.log("in Weather.jsx::searchLocation() - beginning");

        if (event.key === 'Enter') {
            console.log("searchLocation()::event.target.value = **" + event.target.value + "**");

            axios.get(url).then((response) => {
                setData(response.data)
                console.log(response.data)
            })
            setLocation('');
        }

        console.log("in Weather.jsx::searchLocation() - end");
    }
    const handleLocationChange = ({ target }) => {
        console.log("in Weather.jsx::handleLocationChange() - beginning");
        console.log("in Weather.jsx::handleLocationChange()::target.value = **" + target.value + "**");
        setLocation(target.value)
        console.log("in Weather.jsx::handleLocationChange() - end");
      };

    console.log("in Weather.jsx::end of component");

    return (
        <div className="weather">
            <div className="search">
                <input className='bold'
                    value={location}
                    onChange={(e)=>handleLocationChange(e)}  
                    onKeyDown={searchLocation}
                    placeholder="Enter Location"
                    type="text"/>
            </div>
            <div className="container">
                <div className="top">
                    <div className="location">
                        <p>{data.name}</p>
                    </div>
                    <div className="tempature">
                        {data.main ? <h1>{data.main.temp.toFixed()}&#8457;</h1> : null}
                    </div>
                    <div className="description">
                        {data.weather ? <p>{data.weather[0].main}</p> : null}
                    </div>
                </div>
                {data.main &&
                    <div className="bottom">
                    <div className="feels">
                        <p className='bold'>{data.main.feels_like.toFixed()}&#8457;</p>
                        <p>Feels Like</p>
                    </div>
                    <div className="humidity">
                        <p className='bold'>{data.main.humidity}&#x25;</p>
                        <p>Humidity</p>
                    </div>
                    <div className="wind">
                        <p className='bold'>{data.wind.speed.toFixed()} MPH;</p>
                        <p>Wind Speed</p>
                    </div>
                </div>
            }
            </div>
        </div>
    )
}