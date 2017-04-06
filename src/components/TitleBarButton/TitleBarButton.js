import React, { Component, PropTypes } from 'react';

import './TitleBarButton.css';

class TitleBarButton extends Component {
    render() {
        return (
            <img className="titlebar-button"
                 src={this.props.image}
                 alt={this.props.alt}
                 onClick={this.props.handleClick} />
        );
    }
}

TitleBarButton.propTypes = {
    image: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    handleClick: PropTypes.func.isRequired
};

export default TitleBarButton;
