import React, { PropTypes } from 'react';
import { withRouter, Link } from 'react-router-dom';
import './Header.css';
import CityFormContainer from '../../containers/CityFormContainer/CityFormContainer';

const Header = (props) => {
    const isLogoLink = props.location.pathname !== '/';

    return (
        <header>
            <div className="header__title">
                { isLogoLink
                    ? <Link to="/">{ props.title }</Link>
                    : <h1>{ props.title }</h1>
                }
            </div>
            <div className="header__form">
                <CityFormContainer displayMode="inline" />
            </div>
        </header>
    );
};

Header.propTypes = {
    title: PropTypes.string.isRequired
};

export default withRouter(Header);