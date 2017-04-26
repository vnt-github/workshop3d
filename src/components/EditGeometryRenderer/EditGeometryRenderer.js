import React, { Component, PropTypes } from 'react';
import * as THREE from 'three';
import EditorControls from '../../utils/controls/EditorControls';

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
        this.minDistanceVertex = this.minDistanceVertex.bind(this);
        this.createVertexMarker = this.createVertexMarker.bind(this);
        this.onMouseDownVertex = this.onMouseDownVertex.bind(this);
        this.onKeyDownChangeActiveAxis = this.onKeyDownChangeActiveAxis.bind(this);
        this.onKeyDownVertex = this.onKeyDownVertex.bind(this);
        this.makeFace = this.makeFace.bind(this);
        this.extrude = this.extrude.bind(this);
        this.setDefaultFaceColors = this.setDefaultFaceColors.bind(this);
        this.checkNormal = this.checkNormal.bind(this);
        this.checkCommonVertices = this.checkCommonVertices.bind(this);
        this.arrangeVertices = this.arrangeVertices.bind(this);
        this.onKeyDownFace = this.onKeyDownFace.bind(this);
        this.onMouseDownFace = this.onMouseDownFace.bind(this);
        this.assignUVs = this.assignUVs.bind(this);
        this.computeAverageNormal = this.computeAverageNormal.bind(this);
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

        this.geometry = this.props.appState3d.geometries.find((geometry) => {
            return geometry.uuid === this.props.appState.active.id;
        });
        if (this.props.appState.geometryView === 'vertex') {
            this.material = new THREE.MeshBasicMaterial({
                color: 0xcccccc,
                polygonOffset: true,
                polygonOffsetFactor: 1,
                polygonOffsetUnits: 1,
                side: THREE.DoubleSide
            });
        } else {
            this.setDefaultFaceColors();
            this.material = new THREE.MeshBasicMaterial({
                vertexColors: THREE.FaceColors,
                polygonOffset: true,
                polygonOffsetFactor: 1,
                polygonOffsetUnits: 1,
                side: THREE.DoubleSide
            });
        }
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

        this.activeVertices = [];
        this.actualActiveVertices = [];

        this.activeFaces = [];
        this.extrudeVertices = [];
        this.extrudeVerticesMap = [];

        this.activeAxis = 'x';
        window.addEventListener('keydown', this.onKeyDownChangeActiveAxis, false);

        if (this.props.appState.geometryView === 'vertex') {
            window.addEventListener('mousedown', this.onMouseDownVertex, false);
            window.addEventListener('keydown', this.onKeyDownVertex, false);
        } else {
            window.addEventListener('keydown', this.onKeyDownFace, false);
            window.addEventListener('mousedown', this.onMouseDownFace, false);
        }

        window.addEventListener('resize', this.onWindowResize, false);

        this.animate();
    }

    componentWillUnmount() {
        this.animating = false;
        this.controls.enabled = false;
        window.removeEventListener('resize', this.onWindowResize, false);
        window.removeEventListener('mousemove', this.getMousePosition, false);
        window.removeEventListener('keydown', this.onKeyDownChangeActiveAxis, false);
        window.removeEventListener('mousedown', this.onMouseDownVertex, false);
        window.removeEventListener('keydown', this.onKeyDownVertex, false);
        window.removeEventListener('keydown', this.onKeyDownFace, false);
        window.removeEventListener('mousedown', this.onMouseDownFace, false);
    }

    updateWireframe() {
        // this.wireframeGeometry = new THREE.EdgesGeometry( this.geometry );
        this.wireframeGeometry = this.geometry.clone();
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
        this.renderScene();
        if (this.animating) {
            requestAnimationFrame(this.animate);
        }
    }

    getMousePosition(event) {
        const width = window.innerWidth - 12*20;
        const height = window.innerHeight - 12*3;
        this.mouse.x = ((event.clientX - 12*20) / width) * 2 - 1;
        this.mouse.y = - ((event.clientY - 12*3) / height) * 2 + 1;
    }

    onKeyDownChangeActiveAxis(event) {
        switch (event.keyCode) {
            case 88:
                this.activeAxis = 'x';
                break;
            case 89:
                this.activeAxis = 'y';
                break;
            case 90:
                this.activeAxis = 'z';
                break;
            default:
                // none
        }
    }

    minDistanceVertex(point, face) {
        var a = this.geometry.vertices[face.a].clone().applyMatrix4(this.mesh.matrixWorld);
        var b = this.geometry.vertices[face.b].clone().applyMatrix4(this.mesh.matrixWorld);
        var c = this.geometry.vertices[face.c].clone().applyMatrix4(this.mesh.matrixWorld);
        a = point.distanceTo(a);
        b = point.distanceTo(b);
        c = point.distanceTo(c);
        if (a <= b && a <= c) return this.geometry.vertices[face.a];
        else if (b <= c) return this.geometry.vertices[face.b];
        return this.geometry.vertices[face.c];
    }

    createVertexMarker() {
        let geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
        let material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        let mesh = new THREE.Mesh(geometry, material);
        return mesh;
    }

    onMouseDownVertex(event) {
        this.raycaster.setFromCamera(this.mouse, this.camera);
        let intersects = this.raycaster.intersectObjects(this.objects, false);
        if (!event.shiftKey) {
            this.activeVertices.forEach((activeVertex) => {
                this.mesh.remove(activeVertex)
            });
            this.activeVertices = [];
            this.actualActiveVertices = [];
        }
        if (!intersects.length) return;
        let intersect = intersects[0];
        let face = intersect.face;
        let activeVertex = this.createVertexMarker();
        let minDistanceVertexPoint = this.minDistanceVertex(intersect.point, face);
        activeVertex.position.set(
            minDistanceVertexPoint.x,
            minDistanceVertexPoint.y,
            minDistanceVertexPoint.z
        );
        let index = this.actualActiveVertices.findIndex((vertex) => minDistanceVertexPoint === vertex);
        if (index === -1) {
            this.activeVertices.push(activeVertex);
            this.actualActiveVertices.push(minDistanceVertexPoint);
            this.mesh.add(activeVertex);
        }
    }

    onKeyDownVertex(event) {
        switch (event.keyCode) {
            case 38:
            case 39:
                this.actualActiveVertices.forEach((actualActiveVertex) => {
                    actualActiveVertex[this.activeAxis] += 0.1;
                    this.geometry.verticesNeedUpdate = true;
                    this.geometry.computeBoundingSphere();
                });
                this.activeVertices.forEach((activeVertex) => {
                    activeVertex.position[this.activeAxis] += 0.1;
                });
                this.updateWireframe();
                break;
            case 37:
            case 40:
                this.actualActiveVertices.forEach((actualActiveVertex) => {
                    actualActiveVertex[this.activeAxis] -= 0.1;
                    this.geometry.verticesNeedUpdate = true;
                    this.geometry.computeBoundingSphere();
                });
                this.activeVertices.forEach((activeVertex) => {
                    activeVertex.position[this.activeAxis] -= 0.1;
                });
                this.updateWireframe();
                break;
            default:
                //none
        }
    }

    setDefaultFaceColors() {
        for (let i = 0; i < this.geometry.faces.length; i++) {
            let face = this.geometry.faces[i];
            face.color.setRGB(0.8, 0.8, 0.8);
        }
        this.geometry.colorsNeedUpdate = true;
    }

    checkNormal(face1, face2) {
        return ((face1.normal.x === face2.normal.x) && (face1.normal.y === face2.normal.y) && (face1.normal.z === face2.normal.z));
    }

    checkCommonVertices(aExtrudeVerticesMap, aFaceVertices) {
        let matchString = [];
        let count = 0;
        for (let i = 0; i < 3; i += 1) {
            let temp = aExtrudeVerticesMap[aFaceVertices[i]]
            if (temp !== undefined) {
                matchString[count++] = temp;
                //console.log(matchString);
                //console.log(count);
            }
            else {
                matchString[2] = i;
                //console.log(aExtrudeVerticesMap[aFaceVertices[0]]);
                //console.log(matchString);
            }
        }
        //console.log(matchString);
        //console.log(count);
        return {result: (count === 2), matchString: (count === 2) ? matchString : []};
    }

    arrangeVertices(aExtrudeVertices, aExtrudeVerticesMap, aFaceVertices, aMatchString) {
        if (!aExtrudeVertices.length) {
            for (let i = 0; i < 3; i += 1) {
                aExtrudeVertices.push(aFaceVertices[i]);
                aExtrudeVerticesMap[aFaceVertices[i]] = i;
            }
        }
        else {
            let lower = (aMatchString[0] < aMatchString[1]) ? aMatchString[0] : aMatchString[1];
            let upper = (aMatchString[0] > aMatchString[1]) ? aMatchString[0] : aMatchString[1];
            if (!(lower === 0 && upper === aExtrudeVertices.length - 1)) {
                let tempExtrudeVertices = [];
                for (let i = upper; i < aExtrudeVertices.length; i += 1) {
                    tempExtrudeVertices.push(aExtrudeVertices[i]);
                }
                for (let i = 0; i <= lower; i += 1) {
                    tempExtrudeVertices.push(aExtrudeVertices[i]);
                }
                aExtrudeVertices = tempExtrudeVertices;
            }
            aExtrudeVertices.push(aFaceVertices[aMatchString[2]]);
            for (let i = 0; i < aExtrudeVertices.length; i += 1) {
                aExtrudeVerticesMap[aExtrudeVertices[i]] = i;
            }
        }
        //console.log(aExtrudeVertices);
        return {extrudeVertices: aExtrudeVertices, extrudeVerticesMap: aExtrudeVerticesMap};
    }

    makeFace(indexa, indexb, indexc) {
        let face = new THREE.Face3(indexa, indexb, indexc);
        face.color.setRGB(0.8, 0.8, 0.8);
        return face;
    }

    assignUVs(geometry) {
        geometry.faceVertexUvs[0] = [];
        geometry.faces.forEach(function(face) {
            let components = ['x', 'y', 'z'].sort(function(a, b) {
                return Math.abs(face.normal[a]) > Math.abs(face.normal[b]);
            });
            let v1 = geometry.vertices[face.a];
            let v2 = geometry.vertices[face.b];
            let v3 = geometry.vertices[face.c];
            geometry.faceVertexUvs[0].push([
                new THREE.Vector2(v1[components[0]], v1[components[1]]),
                new THREE.Vector2(v2[components[0]], v2[components[1]]),
                new THREE.Vector2(v3[components[0]], v3[components[1]])
            ]);
        });
        geometry.uvsNeedUpdate = true;
    }

    extrude(aVertices, aNormal) {
        let aVerticesClone = [];
        for (let i = 0; i < aVertices.length; i += 1) {
            aVerticesClone.push(this.geometry.vertices[aVertices[i]].clone());
            aVerticesClone[i].add(aNormal);
            this.geometry.vertices.push(aVerticesClone[i]);
        }

        let vertexStartIndex = this.geometry.vertices.length - aVertices.length;
        for (let i = 0; i < this.activeFaces.length; i += 1) {
            let a = vertexStartIndex + this.extrudeVerticesMap[this.activeFaces[i].a];
            let b = vertexStartIndex + this.extrudeVerticesMap[this.activeFaces[i].b];
            let c = vertexStartIndex + this.extrudeVerticesMap[this.activeFaces[i].c];
            this.geometry.faces.push(this.makeFace(a, b, c));
        }
        /*
        for (var i = vertexStartIndex + 1; i < geometry.vertices.length - 1; i = i + 1) {
            geometry.faces.push(makeFace(vertexStartIndex, i, i + 1));
        }*/
        for (let i = vertexStartIndex, j = 0; i < this.geometry.vertices.length; i += 1, j += 1) {
            if (i === this.geometry.vertices.length - 1) {
                this.geometry.faces.push(this.makeFace(i, aVertices[j], aVertices[0]));
                this.geometry.faces.push(this.makeFace(aVertices[0], vertexStartIndex, i));
            } else {
                this.geometry.faces.push(this.makeFace(i, aVertices[j], aVertices[j + 1]));
                this.geometry.faces.push(this.makeFace(aVertices[j + 1], i + 1, i));
            }
        }
        this.assignUVs(this.geometry);
        this.geometry.verticesNeedUpdate = true;
        this.geometry.elementsNeedUpdate = true;
        this.geometry.morphTargetsNeedUpdate = true;
        this.geometry.uvsNeedUpdate = true;
        this.geometry.normalsNeedUpdate = true;
        this.geometry.colorsNeedUpdate = true;
        this.geometry.tangentsNeedUpdate = true;
        this.geometry.computeFaceNormals();
        this.geometry.computeVertexNormals();
        this.geometry.computeBoundingBox();
        this.geometry.computeBoundingSphere();
        this.updateWireframe();
    }

    computeAverageNormal() {
        let normal = this.activeFaces[0].normal;
        for (let i = 1; i < this.activeFaces.length; i += 1) {
            normal.add(this.activeFaces[i].normal);
        }
        normal.normalize();
        return normal;
    }

    onKeyDownFace(event) {
        switch (event.keyCode) {
            case 69:
                if (!this.activeFaces.length) return;
                // this.extrude(this.extrudeVertices, this.activeFaces[this.activeFaces.length - 1].normal);
                this.extrude(this.extrudeVertices, this.computeAverageNormal());
                this.activeFaces = [];
                this.extrudeVertices = [];
                this.extrudeVerticesMap = [];
                break;
            default:
                //none
        }
    }

    onMouseDownFace(event) {
        this.raycaster.setFromCamera(this.mouse, this.camera);
        let intersects = this.raycaster.intersectObjects(this.objects, false);
        if (!intersects.length) {
            return;
        }
        let intersect = intersects[0];
        let face = intersect.face;
        let checkCommonVerticesResult = {result: false, matchString: []};
        if (!event.shiftKey || !this.activeFaces.length) {
            this.activeFaces = [];
            this.extrudeVertices = [];
            this.extrudeVerticesMap = [];
            this.setDefaultFaceColors();
        }
        else {
            checkCommonVerticesResult = this.checkCommonVertices(this.extrudeVerticesMap, [face.a, face.b, face.c]);
            // if (!(this.checkNormal(this.activeFaces[0], face) && 
            //       checkCommonVerticesResult.result)) {
            //     return;
            // }
            if (!checkCommonVerticesResult.result) return;
        }
        this.activeFaces.push(face);
        face.color.setRGB(1, 0.7, 0.7);
        this.geometry.colorsNeedUpdate = true;
        let arrangeVerticesResult = this.arrangeVertices(this.extrudeVertices, this.extrudeVerticesMap,
            [face.a, face.b, face.c],
            checkCommonVerticesResult.matchString);
        this.extrudeVertices = arrangeVerticesResult.extrudeVertices;
        this.extrudeVerticesMap = arrangeVerticesResult.extrudeVerticesMap;
    }

    render() {
        return (
            <div ref="wrapper" className="edit-geometry-renderer__wrapper"></div>
        );
    }
}

EditGeometryRenderer.propTypes = {
    appState3d: PropTypes.object.isRequired,
    appState: PropTypes.object.isRequired
};

export default EditGeometryRenderer;
