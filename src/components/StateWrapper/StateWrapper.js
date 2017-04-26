import React, { Component, PropTypes } from 'react';
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

import EditGeometryRenderer from '../EditGeometryRenderer/EditGeometryRenderer';

import AddMaterialView from '../AddMaterialView/AddMaterialView';
import AddBasicMaterialView from '../AddBasicMaterialView/AddBasicMaterialView';
import AddLambertMaterialView from '../AddLambertMaterialView/AddLambertMaterialView';
import AddPhongMaterialView from '../AddPhongMaterialView/AddPhongMaterialView';
import AddShaderMaterialView from '../AddShaderMaterialView/AddShaderMaterialView';

import AddLightView from '../AddLightView/AddLightView';
import AddAmbientLightView from '../AddAmbientLightView/AddAmbientLightView';
import AddDirectionalLightView from '../AddDirectionalLightView/AddDirectionalLightView';
import AddPointLightView from '../AddPointLightView/AddPointLightView';

import AddMeshView from '../AddMeshView/AddMeshView';

import SceneRenderer from '../SceneRenderer/SceneRenderer';

import Renderer from '../Renderer/Renderer';

import './StateWrapper.css';

class StateWrapper extends Component {
    constructor(props) {
        super(props);

        let initialGeometry = new THREE.BoxGeometry(1, 1, 1);
        initialGeometry.name = 'Geometry1';
        let initialMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
        initialMaterial.name = 'Material1';

        this.state = {
            geometries: [
                { name: 'Geometry1', id: initialGeometry.uuid }
            ],
            materials: [
                { name: 'Material1', id: initialMaterial.uuid }
            ],
            meshes: [],
            lights: [],
            active: {
                type: 'geometry',
                id: initialGeometry.uuid
            },
            geometryView: 'vertex'
        };

        this.threed = {
            geometries: [ initialGeometry ],
            materials: [ initialMaterial ],
            meshes: [],
            lights: []
        };

        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        window.addEventListener('keydown', this.handleDelete, false);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleDelete, false);
    }

    handleDelete(e) {
        if (e.keyCode !== 46) return;
        let id = this.state.active.id;
        let type = this.state.active.type;
        if (type === 'geometry') {
            this.context.router.history.push('/');
            let index = this.threed.geometries.findIndex((geometry) => geometry.uuid === id);
            this.threed.geometries.splice(index, 1);
            let newGeometries = [...this.state.geometries];
            newGeometries.splice(index, 1);
            this.setState({ geometries: newGeometries });
        } else if (type === 'material') {
            let index = this.threed.materials.findIndex((material) => material.uuid === id);
            this.threed.materials.splice(index, 1);
            let newMaterials = [...this.state.materials];
            newMaterials.splice(index, 1);
            this.setState({ materials: newMaterials });
        } else if (type === 'light') {
            let index = this.threed.lights.findIndex((light) => light.uuid === id);
            this.threed.lights.splice(index, 1);
            let newLights = [...this.state.lights];
            newLights.splice(index, 1);
            this.setState({ lights: newLights });
        } else if (type === 'mesh') {
            let index = this.threed.meshes.findIndex((mesh) => mesh.uuid === id);
            this.threed.meshes.splice(index, 1);
            let newMeshes = [...this.state.meshes];
            newMeshes.splice(index, 1);
            this.setState({ meshes: newMeshes });
        }
    }

    handleGeometryAdd(geometry) {
        let geometries = [...this.state.geometries];
        geometries.push({ id: geometry.uuid, name: geometry.name });
        this.threed.geometries.push(geometry);
        this.setState({ geometries: geometries, active: { type: 'geometry', id: geometry.uuid } });
    }

    handleMaterialAdd(material) {
        let materials = [...this.state.materials];
        materials.push({ id: material.uuid, name: material.name });
        this.threed.materials.push(material);
        this.setState({ materials: materials });
    }

    handleMeshAdd(mesh) {
        let meshes = [...this.state.meshes];
        meshes.push({ id: mesh.uuid, name: mesh.name });
        this.threed.meshes.push(mesh);
        this.setState({ meshes: meshes });
    }

    handleLightAdd(light) {
        let lights = [...this.state.lights];
        lights.push({ id: light.uuid, name: light.name });
        this.threed.lights.push(light);
        this.setState({ lights: lights });
    }

    changeActiveObject(type, id) {
        let newActive = { type, id };
        this.setState({ active: newActive });
    }

    changeGeometryView(view) {
        this.setState({ geometryView: view });
    }

    render() {
        const callbacks = {
            handleGeometryAdd: this.handleGeometryAdd.bind(this),
            handleMaterialAdd: this.handleMaterialAdd.bind(this),
            handleMeshAdd: this.handleMeshAdd.bind(this),
            handleLightAdd: this.handleLightAdd.bind(this),
            changeActiveObject: this.changeActiveObject.bind(this),
            changeGeometryView: this.changeGeometryView.bind(this)
        };

        return (
            <div className="two-column">
                <section className="two-column__left">
                    <Sidebar appState={this.state} callbacks={callbacks} />
                </section>
                <section className="two-column__right">
                    <Route exact path="/" component={() => <SceneRenderer appState3d={this.threed} appState={this.state} />} />
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

                    <Route path="/edit/geometry" component={() => <EditGeometryRenderer appState3d={this.threed} appState={this.state} />} />

                    <Route exact path="/add/material" component={AddMaterialView} />
                    <Route path="/add/material/basic" component={() => <AddBasicMaterialView callbacks={callbacks} />} />
                    <Route path="/add/material/lambert" component={() => <AddLambertMaterialView callbacks={callbacks} />} />
                    <Route path="/add/material/phong" component={() => <AddPhongMaterialView callbacks={callbacks} />} />
                    <Route path="/add/material/shader" component={() => <AddShaderMaterialView callbacks={callbacks} />} />

                    <Route exact path="/add/light" component={AddLightView} />
                    <Route path="/add/light/ambient" component={() => <AddAmbientLightView callbacks={callbacks} />} />
                    <Route path="/add/light/directional" component={() => <AddDirectionalLightView callbacks={callbacks} />} />
                    <Route path="/add/light/point" component={() => <AddPointLightView callbacks={callbacks} />} />

                    <Route path="/add/mesh" component={() => <AddMeshView appState3d={this.threed} callbacks={callbacks} />} />
                    <Route path="/scene" component={() => <SceneRenderer appState={this.state} />} />

                    <Route path="/render" component={() => <Renderer appState3d={this.threed} />} />
                </section>
            </div>
        );
    }
}

StateWrapper.contextTypes = {
    router: PropTypes.object
};

export default StateWrapper;
