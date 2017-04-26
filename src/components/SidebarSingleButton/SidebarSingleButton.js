import React, { Component, PropTypes } from 'react';

import './SidebarSingleButton.css';

class SidebarSingleButton extends Component {
    render() {
        let className;
        if (this.props.className) {
            className = 'sidebar-single-button ' + this.props.className;
        } else {
            className = 'sidebar-single-button';
        }

        return (
            <div className={className} onClick={this.props.onClick}>
                {this.props.children}
            </div>
        );
    }
}

SidebarSingleButton.propTypes = {
    onClick: PropTypes.func,
    className: PropTypes.string
};

export default SidebarSingleButton;
