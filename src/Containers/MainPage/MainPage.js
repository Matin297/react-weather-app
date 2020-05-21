import React from 'react'
import PropTypes from 'prop-types'
import { Select } from 'antd'
import PacmanLoader from "react-spinners/PacmanLoader"
import { css } from "@emotion/core"
import 'antd/es/select/style/css'
import './MainPage.css'

const { Option } = Select

function MainPage(props) {

    const {
        err,
        isGeoLocationAllowed,
        forecast,
        cities,
        getForecastByName,
        selectDate,
        loading
    } = props

    const handleChange = value => getForecastByName(value);

    const override = css`
    display: block;
    position: absolute;
    top: calc(50% - 12.5px);
    left: calc(50% - 12.5px);
    border-color: red;
   `;

    return (
        <div className="hp">

            {
                loading ?
                    <PacmanLoader
                        css={override}
                        color="#1890ff"
                        loading={loading}
                    /> :
                    (
                        !isGeoLocationAllowed ?
                            <h1> Geolocation is not supported by you browser! </h1> :
                            <>
                                <Select
                                    onChange={handleChange}
                                    placeholder="Choose a city"
                                    style={{
                                        margin: '0 auto',
                                        display: "block",
                                        width: "50%"
                                    }}
                                    value={forecast.name}
                                >
                                    {
                                        cities.map(city =>
                                            <Option
                                                key={city.id}
                                                value={city.name.toLowerCase()}
                                            >
                                                {city.name + (city.curr ? "(Current location)" : "")}
                                            </Option>)
                                    }
                                </Select>

                                <h1> {err && err} </h1>

                                <div className="hp__forecast">

                                    <div className="hp__forecast__city"> {forecast.name} </div>

                                    {
                                        forecast
                                            .data
                                            .map((info, index) => {

                                                return (
                                                    <div
                                                        className="hp__forecast__item"
                                                        key={index}
                                                        onClick={() => {
                                                            selectDate(info.dt_txt.split(' ')[0]);
                                                            props.history.push(`/details/${info.dayName.toLowerCase()}`);
                                                        }}
                                                    >
                                                        <img
                                                            src={`http://openweathermap.org/img/wn/${info.weather[0].icon}@2x.png`}
                                                            alt="weather icon"
                                                        />
                                                        <p> {info.main.temp_max}&deg; </p>
                                                        <p> {info.main.temp_min}&deg; </p>
                                                        <p> {info.dayName} </p>
                                                    </div>
                                                )

                                            })
                                    }
                                </div>
                            </>
                    )
            }
        </div >
    )
}

MainPage.defaultProps = {
    forecast: {
        data: []
    }
}

MainPage.propTypes = {
    err: PropTypes.string,
    isGeoLocationAllowed: PropTypes.bool,
    forecast: PropTypes.shape({
        name: PropTypes.string,
        data: PropTypes.array,
        date: PropTypes.string
    }),
    cities: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
    })),
    getForecastByName: PropTypes.func,
    selectDate: PropTypes.func,
    loading: PropTypes.bool
}

export default MainPage;