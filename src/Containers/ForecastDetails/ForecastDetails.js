import React from 'react'
import ForecastItem from '../../Components/ForecastDetails/ForecastItem/ForecastItem'
// import { extractSameDays } from '../../utils/days'
// import { Link } from 'react-router-dom'
import './ForecastDetails.css'

function ForecastDetails(props) {

    return (
        <div className="forecast-details">

            {/* <Link
                to={{
                    pathname: "/",
                    state: {
                        ...forecast
                    }
                }}
                className="back-butt"
            >
                Back
            </Link> */}

            <div className="forecast-details__day"> {props.match.params.day} </div>

            <div className="forecast-details__c">

                {
                    props.dataDetails &&
                    props.dataDetails.map((details, index) => (
                        <div key={index} className="forecast-details__item">

                            <img src={`http://openweathermap.org/img/wn/${details.weather[0].icon}@2x.png`} alt="weather icon" />

                            <ForecastItem
                                title={details.weather[0].description}
                                value={details.dt_txt.split(' ')[1]}
                            />

                            <ForecastItem
                                title="Temperature"
                                value={`${details.main.temp}\u00b0C`}
                            />

                            <ForecastItem
                                title="Feels like"
                                value={`${details.main.feels_like}\u00b0C`}
                            />

                            <ForecastItem
                                title="Humidity"
                                value={`${details.main.humidity}%`}
                            />

                            <ForecastItem
                                title="Pressure"
                                value={`${details.main.pressure}hPa`}
                            />

                            <ForecastItem
                                title="Cloudiness"
                                value={`${details.clouds.all}%`}
                            />

                        </div>
                    ))
                }
            </div>

        </div>
    )
}

export default ForecastDetails;