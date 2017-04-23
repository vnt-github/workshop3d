import React, { Component, PropTypes } from 'react';
import * as THREE from 'three';
import TrackballControls from '../../utils/controls/TrackballControls.js';

import './SceneRenderer.css';

class SceneRenderer extends Component {
    constructor(props) {
        super(props);

        this.animating = true;

        this.renderScene = this.renderScene.bind(this);
        this.animate = this.animate.bind(this);
        this.onWindowResize = this.onWindowResize.bind(this);
    }

    componentDidMount() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            45,
            this.refs.wrapper.offsetWidth / this.refs.wrapper.offsetHeight,
            0.1,
            1000
        );
        this.camera.position.set(0, 5, 10);
        this.controls = new TrackballControls(this.camera, this.wrapper);
        this.controls.rotateSpeed = 10.0;
        this.controls.zoomSpeed = 5.0;
        this.controls.panSpeed = 0.8;
        this.controls.noZoom = false;
        this.controls.noPan = false;
        this.controls.staticMoving = true;
        this.controls.dynamicDampingFactor = 0.3;
        this.controls.keys = [65, 83, 68];
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(this.refs.wrapper.offsetWidth, this.refs.wrapper.offsetHeight);
        this.renderer.setClearColor(0x222222);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.refs.wrapper.appendChild(this.renderer.domElement);

        const gridHelper = new THREE.GridHelper(10, 10, 0x884444);
        this.scene.add(gridHelper);

        this.props.appState.meshes.forEach((mesh) => {
            this.scene.add(mesh);
        });
        
        window.addEventListener('resize', this.onWindowResize, false);

        this.animate();
    }

    componentWillUnmount() {
        this.animating = false;
        this.controls.enabled = false;
        window.removeEventListener('resize', this.onWindowResize, false);
    }

    onWindowResize() {
        const width = window.innerWidth - 12 * 20;
        const height = window.innerHeight - 12 * 3;
        this.camera.aspect = width / height;;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    renderScene() {
        this.renderer.render(this.scene, this.camera);
    }

    animate() {
        this.controls.update();
        this.renderScene();
        if (this.animating) {
            requestAnimationFrame(this.animate);
        }
    }

    render() {
        return (
            <div ref="wrapper" className="scene-renderer__wrapper"></div>
        );
    }
}

SceneRenderer.propTypes = {
    appState: PropTypes.object.isRequired
};

export default SceneRenderer;
