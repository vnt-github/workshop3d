import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import './SidebarPanel.css';

class SidebarPanel extends Component {
    constructor(props) {
        super(props);

        let defaultOpen = false;
        if (this.props.defaultOpen) {
            defaultOpen = this.props.defaultOpen;
        }

        this.state = {
            open: defaultOpen
        };

        this.toggleOpen = this.toggleOpen.bind(this);
    }

    toggleOpen() {
        this.setState({ open: !this.state.open });
    }

    render() {
        const panelContents = this.state.open ? this.props.children : null;
        let className;
        if (this.props.className) {
            className = 'sidebar-panel ' + this.props.className;
        } else {
            className = 'sidebar-panel';
        }

        return (
            <div className={className}>
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
    heading: PropTypes.string.isRequired,
    className: PropTypes.string,
    defaultOpen: PropTypes.bool
};

export default SidebarPanel;
