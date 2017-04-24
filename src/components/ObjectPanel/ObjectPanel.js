import React, { Component, PropTypes } from 'react';

import SidebarPanel from '../SidebarPanel/SidebarPanel';
import ObjectList from '../ObjectList/ObjectList';

class ObjectPanel extends Component {
    render() {
        return (
            <SidebarPanel heading="Objects">
                <ObjectList appState={this.props.appState} callbacks={this.props.callbacks} />
            </SidebarPanel>
        );
    }
}

ObjectPanel.propTypes = {
    appState: PropTypes.object.isRequired,
    callbacks: PropTypes.object.isRequired
};

export default ObjectPanel;
