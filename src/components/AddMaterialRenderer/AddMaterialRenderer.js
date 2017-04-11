import React, { Component, PropTypes } from 'react';
import * as THREE from 'three';
import TrackballControls from '../../utils/controls/TrackballControls.js';

import './AddMaterialRenderer.css';

class AddMaterialRenderer extends Component {
    constructor(props) {
        super(props);

        this.animating = true;

        this.renderScene = this.renderScene.bind(this);
        this.animate = this.animate.bind(this);
    }

    componentDidMount() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
        this.camera.position.set(0, 0, 10);
        this.controls = new TrackballControls(this.camera, this.wrapper);
        this.controls.rotateSpeed = 10.0;
        this.controls.zoomSpeed = 5.0;
        this.controls.panSpeed = 0.8;
        this.controls.noZoom = false;
        this.controls.noPan = false;
        this.controls.staticMoving = true;
        this.controls.dynamicDampingFactor = 0.3;
        this.controls.keys = [65, 83, 68];
        this.controls.addEventListener('change', this.renderScene);
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(12 * 20, 12 * 20);
        this.renderer.setClearColor(0x0000);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.wrapper.appendChild(this.renderer.domElement);

        this.geometry = new THREE.SphereGeometry(2, 10, 10);
        this.material = this.props.material;
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.mesh);

        this.animate();
    }

    componentWillUnmount() {
        this.animating = false;
    }

    renderScene() {
        this.renderer.render(this.scene, this.camera);
    }

    animate() {
        this.renderScene();
        this.controls.update();
        if (this.animating) {
            requestAnimationFrame(this.animate);
        }
    }

    render() {
        return (
            <div className="add-material-renderer" ref={(wrapper) => this.wrapper = wrapper}>
            </div>
        );
    }
}

AddMaterialRenderer.propTypes = {
    material: PropTypes.object.isRequired
};

export default AddMaterialRenderer;
