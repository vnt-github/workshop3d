import React, { Component, PropTypes } from 'react';

import './Button.css';

class Button extends Component {
    render() {
        let className;
        if (this.props.className) {
            className = 'button ' + this.props.className;
        } else {
            className = 'button';
        }

        return (
            <div className={className} onClick={this.props.onClick}>
                {this.props.children}
            </div>
        );
    }
}

Button.propTypes = {
    onClick: PropTypes.func,
    className: PropTypes.string
};

export default Button;
