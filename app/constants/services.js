export const forecast = {
    URL: process.env.FORECAST_API_URL || 'http://api.openweathermap.org/data/2.5/forecast/daily',
    APP_ID: process.env.FORECAST_APP_ID || 'e603c81a66e9632eb1c38ad0f379dbcc',
    DEFAULT: {
        UNITS_FORMAT: 'metric',
        DAYS_AMOUNT: 4
    },
    MAX_ALLOWED_DAYS_AMOUNT: 5
};