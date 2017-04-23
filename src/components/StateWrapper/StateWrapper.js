import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import * as THREE from 'three';

import Sidebar from '../Sidebar/Sidebar';

import AddGeometryView from '../AddGeometryView/AddGeometryView';
import AddBoxGeometryView from '../AddBoxGeometryView/AddBoxGeometryView';
import AddCircleGeometryView from '../AddCircleGeometryView/AddCircleGeometryView';
import AddConeGeometryView from '../AddConeGeometryView/AddConeGeometryView';
import AddCylinderGeometryView from '../AddCylinderGeometryView/AddCylinderGeometryView';
import AddDodecahedronGeometryView from '../AddDodecahedronGeometryView/AddDodecahedronGeometryView';
import AddIcosahedronGeometryView from '../AddIcosahedronGeometryView/AddIcosahedronGeometryView';
import AddOctahedronGeometryView from '../AddOctahedronGeometryView/AddOctahedronGeometryView';
import AddPlaneGeometryView from '../AddPlaneGeometryView/AddPlaneGeometryView';
import AddRingGeometryView from '../AddRingGeometryView/AddRingGeometryView';
import AddSphereGeometryView from '../AddSphereGeometryView/AddSphereGeometryView';
import AddTetrahedronGeometryView from '../AddTetrahedronGeometryView/AddTetrahedronGeometryView';
import AddTorusGeometryView from '../AddTorusGeometryView/AddTorusGeometryView';
import AddTorusKnotGeometryView from '../AddTorusKnotGeometryView/AddTorusKnotGeometryView';

import AddMaterialView from '../AddMaterialView/AddMaterialView';
import AddBasicMaterialView from '../AddBasicMaterialView/AddBasicMaterialView';
import AddLambertMaterialView from '../AddLambertMaterialView/AddLambertMaterialView';
import AddPhongMaterialView from '../AddPhongMaterialView/AddPhongMaterialView';
import AddShaderMaterialView from '../AddShaderMaterialView/AddShaderMaterialView';

import AddMeshView from '../AddMeshView/AddMeshView';

import SceneRenderer from '../SceneRenderer/SceneRenderer';

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

    handleMeshAdd(mesh) {
        let meshes = [...this.state.meshes];
        meshes.push(mesh);
        this.setState({ meshes: meshes });
    }

    render() {
        const callbacks = {
            handleGeometryAdd: this.handleGeometryAdd.bind(this),
            handleMaterialAdd: this.handleMaterialAdd.bind(this),
            handleMeshAdd: this.handleMeshAdd.bind(this)
        };

        return (
            <div className="two-column">
                <section className="two-column__left">
                    <Sidebar appState={this.state} callbacks={callbacks} />
                </section>
                <section className="two-column__right">
                    <Route exact path="/add/geometry" component={AddGeometryView} />
                    <Route path="/add/geometry/box" component={() => <AddBoxGeometryView callbacks={callbacks} />} />
                    <Route path="/add/geometry/circle" component={() => <AddCircleGeometryView callbacks={callbacks} />} />
                    <Route path="/add/geometry/cone" component={() => <AddConeGeometryView callbacks={callbacks} />} />
                    <Route path="/add/geometry/cylinder" component={() => <AddCylinderGeometryView callbacks={callbacks} />} />
                    <Route path="/add/geometry/dodecahedron" component={() => <AddDodecahedronGeometryView callbacks={callbacks} />} />
                    <Route path="/add/geometry/icosahedron" component={() => <AddIcosahedronGeometryView callbacks={callbacks} />} />
                    <Route path="/add/geometry/octahedron" component={() => <AddOctahedronGeometryView callbacks={callbacks} />} />
                    <Route path="/add/geometry/plane" component={() => <AddPlaneGeometryView callbacks={callbacks} />} />
                    <Route path="/add/geometry/ring" component={() => <AddRingGeometryView callbacks={callbacks} />} />
                    <Route path="/add/geometry/sphere" component={() => <AddSphereGeometryView callbacks={callbacks} />} />
                    <Route path="/add/geometry/tetrahedron" component={() => <AddTetrahedronGeometryView callbacks={callbacks} />} />
                    <Route path="/add/geometry/torus" component={() => <AddTorusGeometryView callbacks={callbacks} />} />
                    <Route path="/add/geometry/torusknot" component={() => <AddTorusKnotGeometryView callbacks={callbacks} />} />

                    <Route exact path="/add/material" component={AddMaterialView} />
                    <Route path="/add/material/basic" component={() => <AddBasicMaterialView callbacks={callbacks} />} />
                    <Route path="/add/material/lambert" component={() => <AddLambertMaterialView callbacks={callbacks} />} />
                    <Route path="/add/material/phong" component={() => <AddPhongMaterialView callbacks={callbacks} />} />
                    <Route path="/add/material/shader" component={() => <AddShaderMaterialView callbacks={callbacks} />} />

                    <Route path="/add/mesh" component={() => <AddMeshView appState={this.state} callbacks={callbacks} />} />
                    <Route path="/scene" component={() => <SceneRenderer appState={this.state} />} />
                </section>
            </div>
        );
    }
}

export default StateWrapper;
