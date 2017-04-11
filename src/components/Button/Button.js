import React, { Component, PropTypes } from 'react';

import './Button.css';

class Button extends Component {
    render() {
        return (
            <a className="button" onClick={this.props.onClick}>
                {this.props.children}
            </a>
        );
    }
}

Button.propTypes = {
    onClick: PropTypes.func
};

export default Button;
