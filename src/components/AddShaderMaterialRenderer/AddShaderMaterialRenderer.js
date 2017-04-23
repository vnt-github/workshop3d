import React, { Component, PropTypes } from 'react';
import * as THREE from 'three';

import Button from '../Button/Button';

import './AddShaderMaterialRenderer.css';

class AddShaderMaterialRenderer extends Component {
    constructor(props) {
        super(props);

        this.animating = true;
        this.uniforms = {
            u_time: { type: 'f', value: 1.0 },
            u_resolution: { type: 'v2', value: new THREE.Vector2() },
            u_mouse: { type: 'v2', value: new THREE.Vector2() }
        };
        this.vertexShader = `
            uniform vec2 uvScale;
            varying vec2 vUv;
            void main()
            {
                vUv = uvScale * uv;
                vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
                gl_Position = projectionMatrix * mvPosition;
            }
        `;
        this.fragmentShader = `
            void main() {
                gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);
            }
        `;

        this.onMouseMove = this.onMouseMove.bind(this);
        this.renderScene = this.renderScene.bind(this);
        this.animate = this.animate.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
    }

    componentDidMount() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.Camera();
        this.camera.position.z = 1;
        this.geometry = new THREE.PlaneBufferGeometry(2, 2);
        this.material = new THREE.ShaderMaterial({
            uniforms: this.uniforms,
            vertexShader: this.vertexShader,
            fragmentShader: this.props.fragmentShader
        });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.mesh);
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(12 * 20, 12 * 20);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.uniforms.u_resolution.value.x = this.renderer.domElement.width;
        this.uniforms.u_resolution.value.y = this.renderer.domElement.height;
        this.wrapper.appendChild(this.renderer.domElement);
        this.animate();
    }

    componentWillReceiveProps(nextProps) {
        this.material.fragmentShader = nextProps.fragmentShader;
        this.material.needsUpdate = true;
    }

    componentWillUnmount() {
        this.animating = false;
    }

    onMouseMove(e) {
        const offsetLeft = window.innerWidth - 12*20;
        const offsetTop = 12*3;
        this.uniforms.u_mouse.value.x = e.pageX - offsetLeft;
        this.uniforms.u_mouse.value.y = e.pageY - offsetTop;
    }

    renderScene() {
        this.uniforms.u_time.value += 0.05;
        this.renderer.render(this.scene, this.camera);
    }

    animate() {
        this.renderScene();
        if (this.animating) {
            requestAnimationFrame(this.animate);
        }
    }

    handleAdd() {
        this.material.name = this.nameElement.value;
        this.props.callbacks.handleMaterialAdd(this.material);
    }

    render() {
        return (
            <div>
                <div className="add-shader-renderer__wrapper"
                     ref={(wrapper) => this.wrapper = wrapper}
                     onMouseMove={this.onMouseMove} >
                </div>
                <Button className="add-shader-material__button" onClick={this.handleAdd}>Add</Button>
                <label className="add-shader-material__name">
                    Name
                    <input type="text" defaultValue="Material1" ref={(name) => this.nameElement = name} />
                </label>
            </div>
        );
    }
}

AddShaderMaterialRenderer.propTypes = {
    fragmentShader: PropTypes.string.isRequired,
    callbacks: PropTypes.object.isRequired
};

export default AddShaderMaterialRenderer;
