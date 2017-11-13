import React, { PropTypes } from 'react';
import moment from 'moment';
import './DayForecast.css';
import labels from '../../locales/en';
import Loading from '../Loading/Loading';
import ErrorBlock from '../ErrorBlock/ErrorBlock';
import { template } from 'lodash';

const DayForecast = (props) => {
    if (props.isLoading === true) {
        return (
            <Loading />
        );
    }

    if (props.error || !props.forecast || !props.date) {
        return (
            <ErrorBlock message={ props.error || labels.FORECAST.WRONG_PARAMS } />
        );
    }

    return (
        <div>
            <div className="day-forecast__title">
                <h1>{ props.city }</h1>
            </div>
            {props.forecast.weather
                ? <div className="day-forecast">
                    <img className="weather-icon"
                        src={ require("../DayForecastPreview/weather-icons/" + props.forecast.weather[0].icon + ".svg") } />
                    <div className="day-forecast__date">
                        { moment(props.date).format(labels.DATE.FORMAT) }
                    </div>
                    <div className="day-forecast-info-block">
                        <div className="day-forecast-info-block__row">
                            { template(labels.FORECAST.WEATHER_DESCRIPTION)({
                                description: props.forecast.weather[0].description
                            }) }
                        </div>
                        <div className="day-forecast-info-block__row">
                            {template(labels.FORECAST.MIN_TEMPERATURE)({
                                min_temperature: props.forecast.temp.min
                            })}
                        </div>
                        <div className="day-forecast-info-block__row">
                            { template(labels.FORECAST.MAX_TEMPERATURE)({
                                max_temperature:  props.forecast.temp.max
                            }) }
                        </div>
                        <div className="day-forecast-info-block__row">
                            { template(labels.FORECAST.HUMIDITY)({
                                humidity: props.forecast.humidity
                            }) }
                        </div>
                    </div>
                </div>
                : ''
            }
        </div>
    );
};

DayForecast.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    city: PropTypes.string,
    error: PropTypes.string,
    forecast: PropTypes.object,
    date: PropTypes.instanceOf(Date),
};

export default DayForecast;