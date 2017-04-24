import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import * as THREE from 'three';

import ViewContainer from '../ViewContainer/ViewContainer';
import ViewHeading from '../ViewHeading/ViewHeading';
import Button from '../Button/Button';

class AddMeshView extends Component {
    constructor(props) {
        super(props);

        this.handleMeshAdd = this.handleMeshAdd.bind(this);
    }

    handleMeshAdd() {
        let geometry = this.props.appState.geometries.find((geometry) => geometry.uuid === this.refs.geometry.value);
        let material = this.props.appState.materials.find((material) => material.uuid === this.refs.material.value);
        let mesh = new THREE.Mesh(geometry, material);
        mesh.name = this.refs.name.value;
        this.props.callbacks.handleMeshAdd(mesh);
    }

    render() {
        return (
            <ViewContainer>
                <ViewHeading>Add Mesh</ViewHeading>
                <label>
                    Name
                    <input type="text" defaultValue="Mesh1" ref="name" />
                </label>
                <br />
                <label>
                    Geometry
                    <br />
                    <select ref="geometry">
                        {this.props.appState.geometries.map((geometry) => {
                            return <option key={geometry.uuid}
                                           value={geometry.uuid} >
                                       {geometry.name}
                                   </option>
                        })}
                    </select>
                </label>
                <br />
                <label>
                    Material
                    <br />
                    <select ref="material">
                        {this.props.appState.materials.map((material) => {
                            return <option key={material.uuid}
                                           value={material.uuid} >
                                       {material.name}
                                   </option>
                        })}
                    </select>
                </label>
                <br />
                <Link to="/"><Button onClick={this.handleMeshAdd}>Add</Button></Link>
            </ViewContainer>
        );
    }
}

AddMeshView.propTypes = {
    appState: PropTypes.object.isRequired,
    callbacks: PropTypes.object.isRequired
};

export default AddMeshView;
