import React, { Component, PropTypes } from 'react';
import * as THREE from 'three';

import './Renderer.css';

class Renderer extends Component {
    constructor(props) {
        super(props);

        this.handleResize = this.handleResize.bind(this);
        this.renderScene = this.renderScene.bind(this);
        this.animate = this.animate.bind(this);
    }

    componentDidMount() {
        this.wrapperElement = document.getElementById('renderer');
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45,
                                                  (window.innerWidth - 20*12) / (window.innerHeight - 3*12),
                                                  0.1,
                                                  1000);
        this.camera.position.set(0, 0, 100);
        this.camera.lookAt(this.scene.position);

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setClearColor(0x222222);
        this.wrapperElement.appendChild(this.renderer.domElement);
        this.handleResize();

        window.addEventListener('resize', this.handleResize, false);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize, false);
    }

    componentWillReceiveProps(nextProps) {
        // let update = nextProps.appState.update;
        // if (update.type === 'add' && update.object === 'mesh') {
        //     let stateMesh = nextProps.appState.meshes.find((mesh) => mesh.id === update.id);
        //     let geometry = nextProps.appState.geometries.find((geometry) => geometry.id === stateMesh.geometry).geometry;
        //     let material1 = new THREE.MeshBasicMaterial({
        //         color: 0xcccccc,
        //         polygonOffset: true,
        //         polygonOffsetFactor: 1,
        //         polygonOffsetUnits: 1
        //     });
        //     let mesh = new THREE.Mesh(geometry, material1);
        //     this.scene.add(mesh);
        //     let wireframeGeometry = new THREE.EdgesGeometry(mesh.geometry);
        //     let material2 = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 1 });
        //     let wireframe = new THREE.LineSegments(wireframeGeometry, material2);
        //     mesh.add(wireframe);
        //     this.renderScene();
        // }
    }

    handleResize() {
        const width = window.innerWidth - 20*12;
        const height = window.innerHeight - 3*12;
        this.renderer.setSize(width, height);
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderScene();
    }

    renderScene() {
        this.renderer.render(this.scene, this.camera);
    }

    animate() {
        this.renderScene();
        requestAnimationFrame(this.animate);
    }

    render() {
        return (
            <div id="renderer" className="renderer">
            </div>
        );
    }
}

Renderer.propTypes = {
    appState: PropTypes.object
};

export default Renderer;
