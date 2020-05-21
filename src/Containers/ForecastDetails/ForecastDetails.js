import React from 'react'
import PropTypes from 'prop-types'
import ForecastItem from '../../Components/ForecastDetails/ForecastItem/ForecastItem'
import './ForecastDetails.css'


function ForecastDetails(props) {

    return (
        <div className="forecast-details">

            <div className="forecast-details__day"> {props.match.params.day} </div>

            <div className="forecast-details__c">

                {
                    props.dataDetails
                        .map((details, index) => (
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

ForecastDetails.defaultProps = {
    dataDetails: []
}

ForecastDetails.propTypes = {
    dataDetails: PropTypes.array.isRequired
}

export default ForecastDetails;