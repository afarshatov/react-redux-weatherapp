const labels = {
    FORM: {
        ERROR_EMPTY_CITY: 'City can not be empty',
        PLACEHOLDER_CITY: 'Type city',
        SUBMIT: 'Get Weather'
    },
    FORECAST: {
        WRONG_PARAMS: 'Wrong params passed o the route',
        DAY_NO_DATA: 'No forecast for this day',
        WEATHER_DESCRIPTION: '<%- description %>',
        MIN_TEMPERATURE: 'min temp: <%- min_temperature %>',
        MAX_TEMPERATURE: 'max temp: <%- max_temperature %>',
        HUMIDITY: 'humidity: <%- humidity %>',
    },
    API: {
        ERROR: {
            EMPTY_CITY: 'API city param can not be empty',
            INVALID_DAYS_COUNT: 'API count param max is <%- max_count %> but <%- count %> was requested',
            EMPTY_FORECAST: 'API returns empty forecast',
            UNITS_INVALID_FORMAT: 'API units format param must be one of the following: <%- available_formats %>',
            INVALID_REQUESTED_DATE: 'Requested day is invalid: it is in the future or more than <%- max_count %> days from now',
        },
    },
    DATE: {
        FORMAT: 'dddd[,] MMM DD'
    },
    HOME: {
        TITLE: 'Get forecast now!'
    },
    LAYOUT: {
        TITLE: 'Weather App'
    }
};

export default labels;