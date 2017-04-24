import React, { Component, PropTypes } from 'react';

import './SidebarButton.css';

class SidebarButton extends Component {
    render() {
        let className;
        if (this.props.className) {
            className = 'sidebar-button ' + this.props.className;
        } else {
            className = 'sidebar-button';
        }

        return (
            <div className={className} onClick={this.props.handleClick}>
                {this.props.text}
            </div>
        );
    }
}

SidebarButton.propTypes = {
    text: PropTypes.string.isRequired,
    handleClick: PropTypes.func,
    className: PropTypes.string
};

export default SidebarButton;
