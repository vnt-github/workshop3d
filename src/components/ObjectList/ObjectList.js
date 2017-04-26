import React, { Component, PropTypes } from 'react';

import ObjectListElement from '../ObjectListElement/ObjectListElement';

import './ObjectList.css';

class ObjectList extends Component {
    handleChangeActiveObject(type, id) {
        this.props.callbacks.changeActiveObject(type, id);
    }

    render() {
        return (
            <ul className="object-list">
                <li>
                    <ObjectListElement heading="Geometries"
                                       list={this.props.appState.geometries}
                                       link="/edit/geometry"
                                       activeId={this.props.appState.active.id}
                                       handleClick={this.handleChangeActiveObject.bind(this, 'geometry')} />
                </li>
                <li>
                    <ObjectListElement heading="Materials"
                                       list={this.props.appState.materials}
                                       link="/"
                                       activeId={this.props.appState.active.id}
                                       handleClick={this.handleChangeActiveObject.bind(this, 'material')} />
                </li>
                <li>
                    <ObjectListElement heading="Meshes"
                                       list={this.props.appState.meshes}
                                       link="/"
                                       activeId={this.props.appState.active.id}
                                       handleClick={this.handleChangeActiveObject.bind(this, 'mesh')} />
                </li>
                <li>
                    <ObjectListElement heading="Lights"
                                       list={this.props.appState.lights}
                                       link="/"
                                       activeId={this.props.appState.active.id}
                                       handleClick={this.handleChangeActiveObject.bind(this, 'light')} />
                </li>
            </ul>
        );
    }
}

ObjectList.propTypes = {
    appState: PropTypes.object.isRequired,
    callbacks: PropTypes.object.isRequired
};

export default ObjectList;
