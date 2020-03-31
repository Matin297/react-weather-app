import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Select } from 'antd'
import { v4 as uuidv4 } from 'uuid'
import { getForcastByCoordsAPI, getForecastByNameAPI } from '../../api/api'
import { extractFiveDays, extractSameDays } from '../../utils/days'
import 'antd/es/select/style/css'
import './MainPage.css'

const { Option } = Select

function MainPage() {

    const [err, setErr] = useState('');
    const [isGeoLocationAllowed, setIsGeoLocationAllowed] = useState(false);
    const [forecast, setForcast] = useState({
        name: '',
        list: [],
        data: []
    });
    const [cities, setCities] = useState([
        {
            id: uuidv4(),
            name: "Sari"
        },
        {
            id: uuidv4(),
            name: "Zabol",
        },
        {
            id: uuidv4(),
            name: "Ardabil"
        }
    ]);

    useEffect(() => {

        // check if geolocation is supported by user's browser
        if (!navigator.geolocation)
            return setIsGeoLocationAllowed(false);

        setIsGeoLocationAllowed(true);

        navigator.geolocation.getCurrentPosition(pos => {

            getForcastByCoords(pos.coords.longitude, pos.coords.latitude);

        }, e => setErr("Unable to retrieve data!"))

    }, [])

    function getForcastByCoords(lon, lat) {

        getForcastByCoordsAPI(lon, lat)
            .then(res => {

                setForcast({
                    name: res.city.name,
                    list: extractFiveDays(res.list),
                    data: res.list
                })

                setCities([
                    {
                        name: `${res.city.name}`, id: uuidv4(), curr: true
                    },
                    ...cities
                ])

            })
            .catch(e => console.log(e))
    }

    function getForcastByName(name) {

        getForecastByNameAPI(name)
            .then(res => {
                setForcast({
                    name: res.city.name,
                    list: extractFiveDays(res.list),
                    data: res.list
                })
            })
            .catch(e => console.log(e))
    }

    const handleChange = value => getForcastByName(value);

    return (
        <div className="hp">
            {
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
                            disabled={err}
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
                                forecast.list && forecast.list.map((data, index) => {

                                    return (
                                        <Link
                                            to={{
                                                pathname: `/details/${data.dayName.toLowerCase()}`,
                                                state: {
                                                    data: extractSameDays(data.dt_txt.split(' ')[0], forecast.data)
                                                }
                                            }}
                                            key={index}
                                        >
                                            <div className="hp__forecast__item">
                                                <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="weather icon" />
                                                <p> {data.main.temp_max}&deg; </p>
                                                <p> {data.main.temp_min}&deg; </p>
                                                <p> {data.dayName} </p>
                                            </div>
                                        </Link>
                                    )

                                })
                            }
                        </div>
                    </>
            }
        </div >
    )
}

export default MainPage;