import React from 'react';
import labels from '../../locales/en';
import './Home.css';
import CityFormContainer from '../../containers/CityFormContainer/CityFormContainer';

const Home = () => {
    return (
        <div className="home-wrapper">
            <CityFormContainer
                title={ labels.HOME.TITLE }
                displayMode="block" />
        </div>
    );
};

export default Home;