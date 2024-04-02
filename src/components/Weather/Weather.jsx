import React, { useState } from "react";
import axios from 'axios';

import './../../index-weather.css';

//const url = `https://api.openweathermap.org/data/2.5/weather?q=Destin&appid=0c0aa909068afe8c032d27e5c4cdf47c`;

export default function Weather() { 
    return (
        <div className="weather">
            <div className="container">
                <div className="top">
                    <div className="location">
                        <p>Dallas</p>
                    </div>
                    <div className="tempature">
                        <h1>60&#8457;</h1>
                    </div>
                    <div className="description">
                        <p>Cloudy</p>
                    </div>
                </div>
                <div className="bottom">
                    <div className="feels">
                        <p className='bold'>65&#8457;</p>
                        <p>Feels Like</p>
                    </div>
                    <div className="humidity">
                        <p className='bold'>20&#x25;</p>
                        <p>Humidity</p>
                    </div>
                    <div className="wind">
                        <p className='bold'>12 MPH</p>
                        <p>Wind Speed</p>
                    </div>
                </div>
            </div>
        </div>
    )
}