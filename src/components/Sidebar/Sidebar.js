import React, { Component, PropTypes } from 'react';

import AddPanel from '../AddPanel/AddPanel';
import ObjectPanel from '../ObjectPanel/ObjectPanel';

class Sidebar extends Component {
    render() {
        return (
            <div>
                <AddPanel />
                <ObjectPanel appState={this.props.appState} />
            </div>
        );
    }
}

Sidebar.PropTypes = {
    appState: PropTypes.object,
    callbacks: PropTypes.object
};

export default Sidebar;
