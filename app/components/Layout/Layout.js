import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import routes from '../../constants/routes';
import labels from '../../locales/en';
import './Layout.css';
import WeekForecastContainer from '../../containers/WeekForecastContainer/WeekForecastContainer';
import DayForecastContainer from '../../containers/DayForecastContainer/DayForecastContainer';
import Header from '../Header/Header';
import Home from '../Home/Home';

const Layout = () => {
    return (
        <div id="mainContainer">
            <Header title={ labels.LAYOUT.TITLE } />
            <main>
                <Switch>
                    <Route exact path='/' component={ Home } />
                    <Route path={ routes.WEEK_FORECAST + '/:city' } component={ WeekForecastContainer } />
                    <Route path={ routes.DAY_FORECAST + '/:city/:timestamp' } component={ DayForecastContainer } />
                </Switch>
            </main>
        </div>
    );
};

export default withRouter(Layout);