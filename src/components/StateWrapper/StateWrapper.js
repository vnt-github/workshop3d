import React, { Component } from 'react';
import * as THREE from 'three';

import Sidebar from '../Sidebar/Sidebar';
import Renderer from '../Renderer/Renderer';

import './StateWrapper.css';

class StateWrapper extends Component {
    constructor(props) {
        super(props);

        this.state = {
            geometries: [
                { id: Date.now(), name: 'Geometry1', geometry: new THREE.BoxGeometry(20, 20, 20) }
            ],
            materials: [
                { id: Date.now(), name: 'Material1', material: new THREE.MeshBasicMaterial({ color: 0x000000 }) }
            ],
            meshes: [],
            update: {
                type: null,
                object: null,
                id: null
            }
        };

        this.handleMeshAdd = this.handleMeshAdd.bind(this);
    }

    handleMeshAdd() {
        let newMeshes = [...this.state.meshes];
        const id = Date.now();
        newMeshes.push({
            id: id,
            name: 'Mesh1',
            geometry: this.state.geometries[0].id,
            material: this.state.materials[0].id
        });
        this.setState({ meshes: newMeshes, update: { type: 'add', object: 'mesh', id: id } });
    }

    render() {
        const callbacks = {
            handleMeshAdd: this.handleMeshAdd
        };

        return (
            <div className="two-column">
                <section className="two-column__left">
                    <Sidebar appState={this.state} callbacks={callbacks} />
                </section>
                <section className="two-column__right">
                    <Renderer appState={this.state} />
                </section>
            </div>
        );
    }
}

export default StateWrapper;
