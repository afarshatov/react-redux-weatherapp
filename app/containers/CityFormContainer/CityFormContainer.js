import React, { Component } from 'react';
import { connect } from 'react-redux';
import { goToWeekForecastAndFetchForecast } from '../../actions/week-forecast';
import CityForm from '../../components/CityForm/CityForm';
import labels from '../../locales/en';

class CityFormContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: null
        };
        this.onCitySubmit = this.onCitySubmit.bind(this);
    }

    static isCityValid(city) {
        return city !== '';
    }

    onCitySubmit(city) {
        if (CityFormContainer.isCityValid(city)) {
            this.setState({
                hasError: false,
                error: null
            });

            this.props.goToCityForecast(city);
        } else {
            this.setState({
                hasError: true,
                error: labels.FORM.ERROR_EMPTY_CITY
            });
        }
    }

    render() {
        return (
            <CityForm
                title={ this.props.title }
                onCitySubmit={ this.onCitySubmit }
                displayMode={ this.props.displayMode }
                hasError={ this.state.hasError }
                cityPlaceholderError={ this.state.error } />
        )
    }
}

export default connect(
    (state, ownProps) => ({
        displayMode: ownProps.displayMode,
        title: ownProps.title
    }), {
        goToCityForecast: goToWeekForecastAndFetchForecast
    }
)(CityFormContainer);
