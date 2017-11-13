import actions from '../constants/actions';
import { getDayForecast, getForecastForDateFromResult } from '../services/forecast';

export const fetchDayForecastRequest = (city, date) => ({
    type: actions.FETCH_DAY_FORECAST_REQUEST,
    city,
    date
});

export const fetchDayForecastSuccess = (forecast) => ({
    type: actions.FETCH_DAY_FORECAST_SUCCESS,
    forecast
});

export const fetchDayForecastError = (error) => ({
    type: actions.FETCH_DAY_FORECAST_ERROR,
    error
});

export const fetchDayForecast = (city, date) => {
    return (dispatch, getState) => {
        const cachedForecast = getState().weekForecast;

        if (cachedForecast.data && cachedForecast.data.length > 0 &&
            cachedForecast.city === city &&
            cachedForecast.timestamp === date.getTime()
        ) {
            dispatch(fetchDayForecastSuccess(
                getForecastForDateFromResult(cachedForecast.data, date)
            ));
        } else {
            dispatch(fetchDayForecastRequest(city, date));

            return getDayForecast(city, date)
                .then(forecast => {
                    dispatch(fetchDayForecastSuccess(forecast));
                })
                .catch(error => {
                    dispatch(fetchDayForecastError(error.toString()));
                });
        }
    };
};