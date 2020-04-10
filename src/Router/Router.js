import React, { useState, useEffect } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { getForcastByCoordsAPI, getForecastByNameAPI } from '../api/api'
import { extractFiveDays, extractSameDays } from '../utils/days'
import MainPage from '../Containers/MainPage/MainPage'
import ForecastDetails from '../Containers/ForecastDetails/ForecastDetails'
import NotFound from '../Containers/NotFound/NotFound'

function Router() {

    const [state, setState] = useState({
        forecast: {
            name: '',
            data: [],
            date: ''
        },
        cities: [
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
        ],
        err: '',
        isGeoLocationAllowed: true,
        loading: false
    })

    function getForcastByCoords(lon, lat) {

        getForcastByCoordsAPI(lon, lat)
            .then(res => {

                if (res.cod === "200") {
                    setState(state => ({
                        ...state,
                        forecast: {
                            ...state.forecast,
                            name: res.city.name,
                            data: res.list
                        },
                        cities: [
                            {
                                name: `${res.city.name}`,
                                id: uuidv4(), curr: true
                            },
                            ...state.cities
                        ],
                        loading: false
                    }))
                }

                else {
                    setState(state => ({
                        ...state,
                        loading: false
                    }))
                    window.alert(`${res.cod}, somthing went wrong!`);
                }

            })
            .catch(e =>
                setState(state => ({
                    ...state,
                    loading: false
                }))
            )
    }

    function getForecastByName(name) {

        setState(state => ({
            ...state,
            loading: true
        }))

        getForecastByNameAPI(name)
            .then(res => {

                if (res.cod === "200") {
                    setState(state => ({
                        ...state,
                        forecast: {
                            ...state.forecast,
                            name: res.city.name,
                            data: res.list
                        },
                        err: '',
                        loading: false
                    }))
                }

                else {
                    setState(state => ({
                        ...state,
                        loading: false
                    }))
                    window.alert(`${res.cod}, somthing went wrong!`);
                }

            })
            .catch(e =>
                setState(state => ({
                    ...state,
                    loading: false
                }))
            )
    }

    const selectDate = date => {
        setState(state => ({
            ...state,
            forecast: {
                ...state.forecast,
                date
            }
        }))
    }

    useEffect(() => {

        // check if geolocation is supported by user's browser
        if (!navigator.geolocation)
            return setState(state => ({
                ...state,
                isGeoLocationAllowed: false
            }))

        setState(state => ({
            ...state,
            loading: true
        }))

        navigator.geolocation.getCurrentPosition(pos => {

            getForcastByCoords(pos.coords.longitude, pos.coords.latitude);

        }, () => setState(state => ({
            ...state,
            err: "Unable to retrieve Your Location! Choose another.",
            loading: false
        })))

    }, [])

    return (
        <BrowserRouter>

            <div className="main-body">
                <header className="header"> Let's predict the future... </header>

                <Switch>

                    <Route
                        exact
                        path="/"
                        render={props => (
                            <MainPage
                                {...props}
                                err={state.err}
                                isGeoLocationAllowed={state.isGeoLocationAllowed}
                                forecast={{
                                    ...state.forecast,
                                    data: extractFiveDays(state.forecast.data)
                                }}
                                cities={state.cities}
                                getForecastByName={getForecastByName}
                                selectDate={selectDate}
                                loading={state.loading}
                            />
                        )}
                    />

                    <Route
                        exact
                        path="/details/:day"
                        render={props => (
                            <ForecastDetails
                                {...props}
                                dataDetails={extractSameDays(state.forecast.data, state.forecast.date)}
                            />
                        )}
                    />

                    <Route component={NotFound} />

                </Switch>

            </div>
        </BrowserRouter>
    )
}

export default Router