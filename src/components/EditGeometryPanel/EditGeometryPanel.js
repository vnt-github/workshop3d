import React, { Component, PropTypes } from 'react';

import SidebarPanel from '../SidebarPanel/SidebarPanel';
import SidebarButton from '../SidebarButton/SidebarButton';

import './EditGeometryPanel.css';

class EditGeometryPanel extends Component {
    handleGeometryViewChange(view) {
        this.props.callbacks.changeGeometryView(view);
    }

    render() {
        let classNameVertex = 'edit-geometry-panel__button';
        let classNameFace = 'edit-geometry-panel__button';
        if (this.props.appState.geometryView === 'vertex') {
            classNameVertex += ' edit-geometry-panel__button--selected';
        } else {
            classNameFace += ' edit-geometry-panel__button--selected';
        }

        return (
            <SidebarPanel heading="Selection Mode" className="edit-geometry-panel" defaultOpen={true} >
                <SidebarButton text="Vertex Selection"
                               className={classNameVertex}
                               handleClick={this.handleGeometryViewChange.bind(this, 'vertex')} />
                <SidebarButton text="Face Selection"
                               className={classNameFace}
                               handleClick={this.handleGeometryViewChange.bind(this, 'face')} />
            </SidebarPanel>
        );
    }
}

EditGeometryPanel.propTypes = {
    appState: PropTypes.object.isRequired,
    callbacks: PropTypes.object.isRequired
};

export default EditGeometryPanel;
