import React, { PropTypes } from 'react';
import labels from '../../locales/en';
import './WeekForecast.css';
import Loading from '../Loading/Loading';
import ErrorBlock from '../ErrorBlock/ErrorBlock';
import DayForecastPreview from '../DayForecastPreview/DayForecastPreview';
import { forecast as apiConfig }  from '../../constants/services';

const WeekForecast = (props) => {
    const getDays = () => {
        let initialTime = props.startDate.getTime(),
            oneDaySeconds = 24 * 60 * 60 * 1000,
            days = [];

        for (let i = 0; i < props.amount; i++) {
            let currentDate = new Date(initialTime + i * oneDaySeconds),
                currentOptions = {
                    date: currentDate,
                    forecast: null,
                    error: null
                };

            if (props.forecast[i]) {
                currentOptions.forecast = props.forecast[i];
            } else {
                currentOptions.error = labels.FORECAST.DAY_NO_DATA;
            }

            days.push(currentOptions);
        }

        return days;
    };


    if (props.isLoading === true) {
        return (
            <Loading/>
        );
    }

    if (props.error && props.error !== '') {
        return (
            <ErrorBlock message={ props.error } />
        );
    }

    return (
        <div>
            <div>
                <div className="city">
                    <h1>{ props.city }</h1>
                </div>
            </div>
            <div className="days-grid">
                {
                    getDays().map((day, i) =>
                        <DayForecastPreview
                            key={ 'day_' + i }
                            date={ day.date }
                            onDayClick={ props.onDayClick }
                            forecast={ day.forecast }
                            error={ day.error }/>
                    )
                }
            </div>
        </div>
    );
}

WeekForecast.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    city: PropTypes.string.isRequired,
    onDayClick: PropTypes.func.isRequired,
    forecast: PropTypes.array.isRequired,
    startDate: PropTypes.instanceOf(Date),
    amount: PropTypes.number,
    error: PropTypes.string,
};

WeekForecast.defaultProps = {
    startDate: new Date(),
    amount: apiConfig.DEFAULT.DAYS_AMOUNT
};

export default WeekForecast;