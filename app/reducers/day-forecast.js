import actions from '../constants/actions';

const dayForecast = (state = {
    city: null,
    timestamp: 0,
    isFetching: false,
    data: {},
    error: null 
}, action) => {
    switch (action.type) {
        case actions.FETCH_DAY_FORECAST_REQUEST:
            return {
                ...state,
                city: action.city,
                timestamp: action.date.getTime(),
                isFetching: true,
                data: {},
                error: null
            };
        case actions.FETCH_DAY_FORECAST_SUCCESS:
            return {
                ...state,
                isFetching: false,
                data: action.forecast
            };
        case actions.FETCH_DAY_FORECAST_ERROR:
            return {
                ...state,
                isFetching: false,
                error: action.error
            };
        default:
            return state;
    }
};

export default dayForecast;