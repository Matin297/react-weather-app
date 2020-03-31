import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import MainPage from '../Containers/MainPage/MainPage'
import ForecastDetails from '../Containers/ForecastDetails/ForecastDetails'
import NotFound from '../Containers/NotFound/NotFound'

function Router() {

    return (
        <BrowserRouter>

            <header className="header"> Let's predict the future... </header>

            <Switch>

                <Route exact path="/" component={MainPage} />

                <Route exact path="/details/:day" component={ForecastDetails} />

                <Route component={NotFound} />

            </Switch>

        </BrowserRouter>
    )
}

export default Router