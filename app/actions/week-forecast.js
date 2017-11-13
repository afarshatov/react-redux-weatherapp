import actions from '../constants/actions';
import { getWeekForecast } from '../services/forecast';
import { goToCityWeekForecast } from './routing';

export const fetchWeekForecastRequest = (city) => ({
    type: actions.FETCH_WEEK_FORECAST_REQUEST,
    city
});

export const fetchWeekForecastSuccess = (forecast) => ({
    type: actions.FETCH_WEEK_FORECAST_SUCCESS,
    forecast
});

export const fetchWeekForecastError = (error) => ({
    type: actions.FETCH_WEEK_FORECAST_ERROR,
    error
});

export const goToWeekForecastAndFetchForecast = (city) => {
    return dispatch => Promise.all([
        dispatch(goToCityWeekForecast(city)),
        dispatch(fetchWeekForecast(city))
    ]);
};

export const fetchWeekForecast = (city) => {
    return (dispatch, getState) => {
        const cachedForecast = getState().weekForecast;

        if (cachedForecast.data && cachedForecast.data.length > 0 && cachedForecast.city === city) {
            dispatch(fetchWeekForecastSuccess(cachedForecast.data));
        } else {
            dispatch(fetchWeekForecastRequest(city));

            return getWeekForecast(city)
                .then(forecast => {
                    dispatch(fetchWeekForecastSuccess(forecast));
                })
                .catch(error => {
                    dispatch(fetchWeekForecastError(error.toString()));
                });
        }
    };
};