import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchWeekForecast } from '../../actions/week-forecast';
import { goToCityDayForecast } from '../../actions/routing';
import WeekForecast from '../../components/WeekForecast/WeekForecast';

class WeekForecastContainer extends Component {
    constructor(props) {
        super(props);
        this.onDayClick = this.onDayClick.bind(this);
    }

    componentDidMount() {
        this.props.fetchForecast(this.props.city);
    }

    onDayClick(date) {
        this.props.onDayClick(this.props.city, date);
    }

    render() {
        return (
            <WeekForecast
                isLoading={ this.props.isLoading }
                error={ this.props.error }
                city={ this.props.city }
                onDayClick={ this.onDayClick }
                forecast={ this.props.forecast } />
        );
    }
}

export default withRouter(connect(
    (state, ownProps) => ({
        isLoading: state.weekForecast.isFetching,
        error: state.weekForecast.error,
        city: ownProps.match.params.city,
        forecast: state.weekForecast.data
    }), {
        fetchForecast: fetchWeekForecast,
        onDayClick: goToCityDayForecast
    }
)(WeekForecastContainer));