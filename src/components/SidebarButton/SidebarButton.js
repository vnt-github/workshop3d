import React, { Component, PropTypes } from 'react';

import './SidebarButton.css';

class SidebarButton extends Component {
    render() {
        return (
            <div className="sidebar-button" onClick={this.props.handleClick}>
                {this.props.text}
            </div>
        );
    }
}

SidebarButton.propTypes = {
    text: PropTypes.string.isRequired,
    handleClick: PropTypes.func
};

export default SidebarButton;
