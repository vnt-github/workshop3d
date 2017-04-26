import React, { Component, PropTypes } from 'react';
import { Route } from 'react-router-dom';

import AddPanel from '../AddPanel/AddPanel';
import ObjectPanel from '../ObjectPanel/ObjectPanel';
import EditGeometryPanel from '../EditGeometryPanel/EditGeometryPanel';
import RenderPanel from '../RenderPanel/RenderPanel';

import './Sidebar.css';

class Sidebar extends Component {
    render() {
        return (
            <div className="sidebar">
                <AddPanel />
                <ObjectPanel appState={this.props.appState} callbacks={this.props.callbacks} />
                <Route path="/edit/geometry"
                       component={() => (
                            <EditGeometryPanel appState={this.props.appState}
                                               callbacks={this.props.callbacks} />
                        )} />
                <RenderPanel />
            </div>
        );
    }
}

Sidebar.PropTypes = {
    appState: PropTypes.object,
    callbacks: PropTypes.object
};

export default Sidebar;
