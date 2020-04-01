import React from 'react'
import { extractSameDays } from '../../utils/days'
import { Link } from 'react-router-dom'
import './ForecastDetails.css'

function ForecastDetails(props) {

    const forecast = props.location.state.forecast;
    const date = props.location.state.date;

    const dataList = extractSameDays(date, forecast.data);

    return (
        <div className="forecast-details">

            <Link
                to={{
                    pathname: "/",
                    state: {
                        ...forecast
                    }
                }}
                className="back-butt"
            >
                Back
            </Link>

            <div className="forecast-details__day"> {props.match.params.day} </div>

            <div className="forecast-details__c">

                {
                    dataList &&
                    dataList.map((data, index) => (
                        <div key={index} className="forecast-details__item">

                            <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="weather icon" />

                            <div>
                                <div> {data.weather[0].description} </div>
                                <div> {data.dt_txt.split(' ')[1]} </div>
                            </div>

                            <div>
                                <span> Temperature </span>
                                <span> {data.main.temp}&deg; </span>
                            </div>

                            <div>
                                <span> Feels like </span>
                                <span> {data.main.feels_like}&deg; </span>
                            </div>

                            <div>
                                <span> Humidity </span>
                                <span> {data.main.humidity}% </span>
                            </div>

                            <div>
                                <span> Pressure </span>
                                <span> {data.main.pressure}hPa </span>
                            </div>

                            <div>
                                <span> Cloudiness </span>
                                <span> {data.clouds.all}% </span>
                            </div>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}

export default ForecastDetails;