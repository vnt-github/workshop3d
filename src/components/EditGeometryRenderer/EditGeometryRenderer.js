import React, { Component, PropTypes } from 'react';
import * as THREE from 'three';
import TrackballControls from '../../utils/controls/TrackballControls.js';

import './EditGeometryRenderer.css';

class EditGeometryRenderer extends Component {
    constructor() {
        super();

        this.animating = true;

        this.renderScene = this.renderScene.bind(this);
        this.animate = this.animate.bind(this);
        this.onWindowResize = this.onWindowResize.bind(this);
        this.updateWireframe = this.updateWireframe.bind(this);
        this.getMousePosition = this.getMousePosition.bind(this);
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
        this.renderer.setClearColor(0x000000);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.refs.wrapper.appendChild(this.renderer.domElement);

        this.geometry = this.props.appState.geometries.find((geometry) => {
            return geometry.uuid === this.props.appState.active.id;
        });
        this.geometry = this.geometry.clone();
        this.material = new THREE.MeshBasicMaterial({
            color: 0xcccccc,
            polygonOffset: true,
            polygonOffsetFactor: 1,
            polygonOffsetUnits: 1,
            side: THREE.DoubleSide
        });
        // this.wireframeMaterial = new THREE.LineBasicMaterial({ color: 0x777777, linewidth: 1 });
        this.wireframeMaterial = new THREE.MeshBasicMaterial({ color: 0x777777, wireframe: true });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.updateWireframe();
        this.scene.add(this.mesh);
        this.objects = [this.mesh];

        const gridHelper = new THREE.GridHelper(10, 10, 0x884444);
        this.scene.add(gridHelper);

        this.raycaster = new THREE.Raycaster();
        this.mouse = { };
        window.addEventListener('mousemove', this.getMousePosition, false);

        window.addEventListener('resize', this.onWindowResize, false);

        this.animate();
    }

    componentWillUnmount() {
        this.animating = false;
        this.controls.enabled = false;
        window.removeEventListener('resize', this.onWindowResize, false);
        window.removeEventListener('mousemove', this.getMousePosition, false);
    }

    updateWireframe() {
        // this.wireframeGeometry = new THREE.EdgesGeometry( this.geometry );
        this.wireframeGeometry = this.geometry;
        if (this.wireframe) {
            this.mesh.remove(this.wireframe);
        }
        // this.wireframe = new THREE.LineSegments(this.wireframeGeometry, this.wireframeMaterial);
        this.wireframe = new THREE.Mesh(this.wireframeGeometry, this.wireframeMaterial);
        this.mesh.add(this.wireframe);
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

    getMousePosition(event) {
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    }

    render() {
        return (
            <div ref="wrapper" className="edit-geometry-renderer__wrapper"></div>
        );
    }
}

EditGeometryRenderer.propTypes = {
    appState: PropTypes.object.isRequired
};

export default EditGeometryRenderer;
