import React, { Component, PropTypes } from 'react';
import * as THREE from 'three';
import EditorControls from '../../utils/controls/EditorControls';

import Button from '../Button/Button';

import './Renderer.css';

class Renderer extends Component {
    constructor() {
        super();

        this.animating = true;

        this.renderScene = this.renderScene.bind(this);
        this.animate = this.animate.bind(this);
        this.onWindowResize = this.onWindowResize.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.set(0, 5, 10);
        this.camera.lookAt(this.scene.position);
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0x000000);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.refs.wrapper.appendChild(this.renderer.domElement);
        this.controls = new EditorControls(this.camera, this.renderer.domElement);

        this.props.appState3d.lights.forEach((light) => {
            this.scene.add(light);
        });
        this.props.appState3d.meshes.forEach((mesh) => {
            this.scene.add(mesh);
        })

        window.addEventListener('resize', this.onWindowResize, false);

        this.animate();
    }

    componentWillUnmount() {
        this.animating = false;
        this.controls.enabled = false;
        window.removeEventListener('resize', this.onWindowResize, false);
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    renderScene() {
        this.renderer.render(this.scene, this.camera);
    }

    animate() {
        this.renderScene();
        if (this.animating) {
            requestAnimationFrame(this.animate);
        }
    }

    handleClick(e) {
        this.context.router.history.goBack();
    }

    render() {
        return (
            <div className="renderer__wrapper">
                <div ref="wrapper"></div>
                <Button onClick={this.handleClick} className="renderer__button">Done</Button>
            </div>
        );
    }
}

Renderer.propTypes = {
    appState3d: PropTypes.object.isRequired
};

Renderer.contextTypes = {
    router: PropTypes.object
};

export default Renderer;
