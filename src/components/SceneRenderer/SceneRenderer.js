import React, { Component, PropTypes } from 'react';
import * as THREE from 'three';
import EditorControls from '../../utils/controls/EditorControls';
import TransformControls from '../../utils/controls/TransformControls';

import './SceneRenderer.css';

class SceneRenderer extends Component {
    constructor(props) {
        super(props);

        this.animating = true;

        this.renderScene = this.renderScene.bind(this);
        this.animate = this.animate.bind(this);
        this.onWindowResize = this.onWindowResize.bind(this);
        this.enableControls = this.enableControls.bind(this);
        this.disableControls = this.disableControls.bind(this);
        this.switchTransformControls = this.switchTransformControls.bind(this);
        this.onTransform = this.onTransform.bind(this);
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
        this.camera.lookAt(this.scene.position);
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(this.refs.wrapper.offsetWidth, this.refs.wrapper.offsetHeight);
        this.renderer.setClearColor(0x000000);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.refs.wrapper.appendChild(this.renderer.domElement);
        this.controls = new EditorControls(this.camera, this.renderer.domElement);

        const gridHelper = new THREE.GridHelper(10, 10, 0x884444);
        this.scene.add(gridHelper);

        this.materials = [
            new THREE.MeshBasicMaterial({ color: 0xcccccc }),
            new THREE.MeshBasicMaterial({ color: 0x777777, wireframe: true })
        ];
        this.materials2 = [
            new THREE.MeshBasicMaterial({ color: 0x2ca8c9 }),
            new THREE.MeshBasicMaterial({ color: 0x777777, wireframe: true })
        ];
        this.activeMesh = null;
        this.realActiveMesh = null;
        this.props.appState3d.meshes.forEach((mesh) => {
            let object = THREE.SceneUtils.createMultiMaterialObject(mesh.geometry, this.materials);
            this.copyParameters(object, mesh);
            this.scene.add(object);
            if (this.props.appState.active.id === mesh.uuid) {
                this.activeMesh = object;
                this.realActiveMesh = mesh;
            }
        });
        this.props.appState3d.lights.forEach((light) => {
            let geometry = new THREE.SphereGeometry(0.1, 4, 4);
            let object = THREE.SceneUtils.createMultiMaterialObject(geometry, this.materials2);
            this.copyParameters(object, light);
            this.scene.add(object);
            if (this.props.appState.active.id === light.uuid) {
                this.activeMesh = object;
                this.realActiveMesh = light;
            }
        });
        if (this.activeMesh) {
            this.transformControls = new TransformControls(this.camera, this.renderer.domElement);
            this.transformControls.attach(this.activeMesh);
            this.scene.add(this.transformControls);
            this.transformControls.addEventListener('mouseDown', this.disableControls);
            this.transformControls.addEventListener('mouseUp', this.enableControls);
            this.transformControls.addEventListener('change', this.onTransform);
            window.addEventListener('keydown', this.switchTransformControls, false);
        }
        
        window.addEventListener('resize', this.onWindowResize, false);

        this.animate();
    }

    enableControls() {
        this.controls.enabled = true;
    }

    disableControls() {
        this.controls.enabled = false;
    }

    switchTransformControls(e) {
        if (!this.transformControls) return;
        switch(e.keyCode) {
            case 84:
                this.transformControls.setMode('translate');
                break;
            case 82:
                this.transformControls.setMode('rotate');
                break;
            case 83:
                this.transformControls.setMode('scale');
                break;
            default:
                //none
        }
    }

    onTransform() {
        this.copyParameters(this.realActiveMesh, this.activeMesh);
    }

    copyParameters(object1, object2) {
        object1.position.x = object2.position.x;
        object1.position.y = object2.position.y;
        object1.position.z = object2.position.z;
        object1.rotation.x = object2.rotation.x;
        object1.rotation.y = object2.rotation.y;
        object1.rotation.z = object2.rotation.z;
        object1.scale.x = object2.scale.x;
        object1.scale.y = object2.scale.y;
        object1.scale.z = object2.scale.z;
    }

    componentWillUnmount() {
        this.animating = false;
        this.controls.enabled = false;
        window.removeEventListener('resize', this.onWindowResize, false);
        window.removeEventListener('keydown', this.switchTransformControls, false);
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
    appState3d: PropTypes.object.isRequired,
    appState: PropTypes.object.isRequired
};

export default SceneRenderer;
