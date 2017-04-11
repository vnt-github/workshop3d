import React, { Component, PropTypes } from 'react';

import ObjectListElement from '../ObjectListElement/ObjectListElement';

class ObjectList extends Component {
    render() {
        return (
            <ul>
                <li>
                    <ObjectListElement heading="Geometries" list={this.props.appState.geometries} />
                </li>
                <li>
                    <ObjectListElement heading="Materials" list={this.props.appState.materials} />
                </li>
                <li>
                    <ObjectListElement heading="Meshes" list={this.props.appState.meshes} />
                </li>
            </ul>
        );
    }
}

ObjectList.propTypes = {
    appState: PropTypes.object.isRequired
};

export default ObjectList;
