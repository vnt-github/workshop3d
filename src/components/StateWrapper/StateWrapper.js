import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import * as THREE from 'three';

import Sidebar from '../Sidebar/Sidebar';
import AddGeometryView from '../AddGeometryView/AddGeometryView';
import AddBoxGeometryView from '../AddBoxGeometryView/AddBoxGeometryView';
import AddMaterialView from '../AddMaterialView/AddMaterialView';
import AddBasicMaterialView from '../AddBasicMaterialView/AddBasicMaterialView';
import AddShaderMaterialView from '../AddShaderMaterialView/AddShaderMaterialView';
import AddMeshView from '../AddMeshView/AddMeshView';

import './StateWrapper.css';

class StateWrapper extends Component {
    constructor(props) {
        super(props);

        let initialGeometry = new THREE.BoxGeometry(10, 10, 10);
        initialGeometry.name = 'Geometry1';
        let initialMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
        initialMaterial.name = 'Material1';

        this.state = {
            geometries: [
                initialGeometry
            ],
            materials: [
                initialMaterial
            ],
            meshes: [],
            update: {
                type: null,
                object: null,
                id: null
            }
        };
    }

    handleGeometryAdd(geometry) {
        let geometries = [...this.state.geometries];
        geometries.push(geometry);
        this.setState({ geometries: geometries });
    }

    handleMaterialAdd(material) {
        let materials = [...this.state.materials];
        materials.push(material);
        this.setState({ materials: materials });
    }

    render() {
        const callbacks = {
            handleGeometryAdd: this.handleGeometryAdd.bind(this),
            handleMaterialAdd: this.handleMaterialAdd.bind(this)
        };

        return (
            <div className="two-column">
                <section className="two-column__left">
                    <Sidebar appState={this.state} callbacks={callbacks} />
                </section>
                <section className="two-column__right">
                    <Route exact path="/add/geometry" component={AddGeometryView} />
                    <Route path="/add/geometry/box" component={() => <AddBoxGeometryView callbacks={callbacks} />} />
                    <Route exact path="/add/material" component={AddMaterialView} />
                    <Route path="/add/material/basic" component={() => <AddBasicMaterialView callbacks={callbacks} />} />
                    <Route path="/add/material/shader" component={AddShaderMaterialView} />
                    <Route path="/add/mesh" component={AddMeshView} />
                </section>
            </div>
        );
    }
}

export default StateWrapper;
