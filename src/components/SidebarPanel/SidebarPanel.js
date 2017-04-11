import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import './SidebarPanel.css';

class SidebarPanel extends Component {
    constructor() {
        super();

        this.state = {
            open: false
        };

        this.toggleOpen = this.toggleOpen.bind(this);
    }

    toggleOpen() {
        this.setState({ open: !this.state.open });
    }

    render() {
        const panelContents = this.state.open ? this.props.children : null;

        return (
            <div className="sidebar-panel">
                <div className="sidebar-panel__heading" onClick={this.toggleOpen}>
                    {this.props.heading}
                </div>
                <ReactCSSTransitionGroup transitionName="slide"
                                         transitionEnterTimeout={500}
                                         transitionLeaveTimeout={500} >
                    {panelContents}
                </ReactCSSTransitionGroup>
            </div>
        );
    }
}

SidebarPanel.propTypes = {
    heading: PropTypes.string.isRequired
};

export default SidebarPanel;
