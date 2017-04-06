import React, { Component, PropTypes } from 'react';

import SidebarButton from '../SidebarButton/SidebarButton';

class Sidebar extends Component {
    render() {
        return (
            <div>
                <SidebarButton text="Add" handleClick={this.props.callbacks.handleMeshAdd} />
            </div>
        );
    }
}

Sidebar.PropTypes = {
    appState: PropTypes.object,
    callbacks: PropTypes.object
};

export default Sidebar;
