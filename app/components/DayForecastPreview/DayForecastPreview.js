import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import labels from '../../locales/en';
import './DayForecastPreview.css';

class DayForecastPreview extends Component {
    constructor(props) {
        super(props);
        this.onDayClick = this.onDayClick.bind(this);
    }

    onDayClick(event) {
        event.preventDefault();
        this.props.onDayClick(this.props.date);
    }

    render() {
        if (this.props.error) {
            return (
                <div className="grid-cell grid-cell--has-error bg-danger">
                    <div className="error-text text-danger">{ this.props.error }</div>
                    <div className="day-text">
                        { moment(this.props.date).format(labels.DATE.FORMAT) }
                    </div>
                </div>
            );
        }

        return (
            <a className="grid-cell" onClick={this.onDayClick} href="#">
                <img className="weather-icon"
                    src={ require("./weather-icons/" + this.props.forecast.weather[0].icon + ".svg") } />
                <div className="day-text">
                    { moment(this.props.date).format(labels.DATE.FORMAT) }
                </div>
            </a>
        );
    }
};

DayForecastPreview.propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
    onDayClick: PropTypes.func.isRequired,
    forecast: PropTypes.object,
    error: PropTypes.string
};

export default DayForecastPreview;