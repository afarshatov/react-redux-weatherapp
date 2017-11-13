import { push } from 'react-router-redux';
import routes from '../constants/routes';

export const goToCityWeekForecast = city => dispatch => {
    dispatch(push(routes.WEEK_FORECAST + '/' + city));
};

export const goToCityDayForecast = (city, date) => dispatch => {
    dispatch(push(routes.DAY_FORECAST + '/' + city + '/' + date.getTime()));
};