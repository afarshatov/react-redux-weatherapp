import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchDayForecast } from '../../actions/day-forecast';
import DayForecast from '../../components/DayForecast/DayForecast';

class DayForecastContainer extends Component {
    componentDidMount() {
        this.props.fetchForecast(this.props.city, this.props.date);
    }

    render() {
        return (
            <DayForecast
                isLoading={ this.props.isLoading }
                error={ this.props.error }
                forecast={ this.props.forecast }
                city={ this.props.city }
                date={ this.props.date }
            />
        )
    }
}

export default withRouter(connect(
    (state, ownProps) => ({
        isLoading: state.dayForecast.isFetching,
        error: state.dayForecast.error,
        forecast: state.dayForecast.data,
        city: ownProps.match.params.city,
        date: new Date(Number(ownProps.match.params.timestamp))
    }),
    {
        fetchForecast: fetchDayForecast
    }
)(DayForecastContainer));