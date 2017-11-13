import actions from '../constants/actions';

const weekForecast = (state = {
    city: null,
    isFetching: false,
    data: [],
    error: null
}, action) => {
    switch (action.type) {
        case actions.FETCH_WEEK_FORECAST_REQUEST:
            return {
                ...state,
                city: action.city,
                isFetching: true,
                data: [],
                error: null
            };
        case actions.FETCH_WEEK_FORECAST_SUCCESS:
            return {
                ...state,
                isFetching: false,
                data: action.forecast
            };
        case actions.FETCH_WEEK_FORECAST_ERROR:
            return {
                ...state,
                isFetching: false,
                error: action.error
            };
        default:
            return state;
    }
};

export default weekForecast;