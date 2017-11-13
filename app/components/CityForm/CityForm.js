import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import './CityForm.css';
import labels from '../../locales/en';

class CityForm extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    getInputValue() {
        return this.refs.city.value;
    }

    onSubmit(event) {
        event.preventDefault();
        this.props.onCitySubmit(this.getInputValue(), this.props.displayMode);
    }

    getFormPlaceholder() {
        let placeholder = '';

        if (this.props.hasError) {
            placeholder = this.props.cityPlaceholderError 
                ? this.props.cityPlaceholderError
                : labels.FORM.ERROR_EMPTY_CITY;
        } else {
            placeholder = this.props.cityPlaceholder 
                ? this.props.cityPlaceholder
                : labels.FORM.PLACEHOLDER_CITY;
        }

        return placeholder;
    }

    render() {
        return (
            <div className={ classNames(
                'city-form-wrapper',
                { 'city-form-wrapper--centered': this.props.displayMode !== 'inline' }
            ) }>
                { this.props.title && <h1 className="city-form__title">{ this.props.title }</h1> }
                <form 
                    id={ "form-" + this.props.displayMode }
                    onSubmit={ this.onSubmit }
                    className={ classNames(
                        'city-form',
                        { 'form-inline': this.props.displayMode === 'inline' },
                        { 'city-form--has-error': this.props.hasError }
                    )}
                    role="form">
                        <div className={ classNames(
                            'form-group',
                            { 'has-error': this.props.hasError }
                        ) }>
                            <input 
                                ref='city'
                                type="text"
                                name="city"
                                className="form-control"
                                placeholder={ this.getFormPlaceholder() }
                            />
                            { this.props.hasError && <span className="glyphicon glyphicon-remove form-control-feedback" /> }
                        </div>
                        <button type="submit" className="btn btn-success">{ labels.FORM.SUBMIT }</button>
                </form>
            </div>
        );
    }
}

CityForm.propTypes = {
    onCitySubmit: PropTypes.func.isRequired,
    cityPlaceholder: PropTypes.string,
    cityPlaceholderError: PropTypes.string,
    displayMode: PropTypes.string.isRequired,
    hasError: PropTypes.bool,
    title: PropTypes.string
};

export default CityForm;