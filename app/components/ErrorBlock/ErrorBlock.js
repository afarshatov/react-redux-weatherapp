import React, { PropTypes } from 'react';
import './ErrorBlock.css';

const ErrorBlock = (props) => {
    return (
        <div className="error-block bg-danger">
            <div className="error-block__wrapper">
                <div className="error-block__text text-danger">{ props.message }</div>
            </div>
        </div>
    );
};

ErrorBlock.propTypes = {
    message: PropTypes.string.isRequired
};

export default ErrorBlock;