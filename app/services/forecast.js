import axios from 'axios';
import { forecast as apiConfig }  from '../constants/services';
import labels from '../locales/en';
import { template } from 'lodash';

const params = [
    'q=<%- city %>',
    'type=accurate',
    'APPID=<%- app_id %>',
    'cnt=<%- count %>',
    'units=<%- unitsFormat %>'
];

const getApiUrl = (city, count, unitsFormat) => {
    return apiConfig.URL + '?'
        + template(params.join('&'))({
            app_id: apiConfig.APP_ID,
            city,
            count,
            unitsFormat
        });
};

const validateParams = (city, count, unitsFormat, date) => {
    return new Promise((resolve, reject) => {
        if (!city || city === '') {
            reject(new Error(labels.API.ERROR.EMPTY_CITY));
        }

        const availableUnitFormats = ['metric', 'imperial'];
        if (!unitsFormat || availableUnitFormats.indexOf(unitsFormat) < 0) {
            reject(new Error(
                template(labels.API.ERROR.UNITS_INVALID_FORMAT)({
                    available_formats: availableUnitFormats.join(', ')
                })
            ));
        }

        if (count > apiConfig.MAX_ALLOWED_DAYS_AMOUNT) {
            reject(new Error(
                template(labels.API.ERROR.INVALID_DAYS_COUNT)({
                    max_count: apiConfig.MAX_ALLOWED_DAYS_AMOUNT,
                    count
                })
            ));
        }

        if (date) {
            const requestedDayIndex = getRequestedDayIndex(date);

            if (requestedDayIndex < 0 || requestedDayIndex > apiConfig.MAX_ALLOWED_DAYS_AMOUNT - 1) {
                reject(new Error(
                    template(labels.API.ERROR.INVALID_REQUESTED_DATE)({
                        max_count: apiConfig.MAX_ALLOWED_DAYS_AMOUNT
                    })
                ));
            }
        }

        resolve();
    });
};

const getRequestedDayIndex = (date) => {
    const requestedTimestamp = date.getTime(),
        nowTimestamp = (new Date()).getTime();

    return Math.round((requestedTimestamp - nowTimestamp) / (1000 * 60 * 60 * 24));
};

export const getForecastForDateFromResult = (weekForecast, date) => weekForecast[getRequestedDayIndex(date)];

export const getWeekForecast = (
    city,
    count = apiConfig.DEFAULT.DAYS_AMOUNT,
    unitsFormat = apiConfig.DEFAULT.UNITS_FORMAT
) => {
    return validateParams(city, count, unitsFormat)
        .then(() => {
            return axios.get(getApiUrl(city, count, unitsFormat));
        })
        .then(forecast => {
            return forecast.data.list;
        });
};


export const getDayForecast = (
    city,
    date = new Date(),
    count = apiConfig.DEFAULT.DAYS_AMOUNT,
    unitsFormat = apiConfig.DEFAULT.UNITS_FORMAT
) => {
    return validateParams(city, count, unitsFormat, date)
        .then(() => {
            return axios.get(getApiUrl(city, count, unitsFormat));
        })
        .then(forecast => {
            return getForecastForDateFromResult(forecast.data.list, date);
        });
};