import React, { Component, PropTypes } from 'react';
import * as THREE from 'three';

import ViewContainer from '../ViewContainer/ViewContainer';
import ViewHeading from '../ViewHeading/ViewHeading';
import Button from '../Button/Button';
import AddGeometryRenderer from '../AddGeometryRenderer/AddGeometryRenderer';

class AddConeGeometryView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            geometry: new THREE.ConeGeometry(1, 2, 8)
        };

        this.radius = 1;
        this.height = 2;
        this.radialSegments = 8;
        this.heightSegments = 1;
        this.openEnded = false;
        this.thetaStart = 0;
        this.thetaLength = 6.28;

        this.handleAdd = this.handleAdd.bind(this);
    }

    onChange(prop, e) {
        this[prop] = Number(e.target.value);
        let geometry = new THREE.ConeGeometry(
            this.radius,
            this.height,
            this.radialSegments,
            this.heightSegments,
            this.openEnded,
            this.thetaStart,
            this.thetaLength
        );
        this.setState({
            geometry: geometry
        });
    }

    handleCheck(prop, e) {
        this[prop] = e.target.checked;
        let geometry = new THREE.ConeGeometry(
            this.radius,
            this.height,
            this.radialSegments,
            this.heightSegments,
            this.openEnded,
            this.thetaStart,
            this.thetaLength
        );
        this.setState({
            geometry: geometry
        });
    }

    handleAdd() {
        let geometry = this.state.geometry.clone();
        geometry.name = this.nameElement.value;
        this.props.callbacks.handleGeometryAdd(geometry);
    }

    render() {
        return (
            <ViewContainer>
                <ViewHeading>Add Cone Geometry</ViewHeading>
                <label>
                    Name
                    <input type="text" defaultValue="Geometry1" ref={(nameElement) => this.nameElement = nameElement} />
                </label>
                <br />
                <label>
                    Radius
                    <input type="number" defaultValue="1" onChange={this.onChange.bind(this, 'radius')} />
                </label>
                <br />
                <label>
                    Height
                    <input type="number" defaultValue="2" onChange={this.onChange.bind(this, 'height')} />
                </label>
                <br />
                <label>
                    Radial Segments
                    <input type="number" defaultValue="8" onChange={this.onChange.bind(this, 'radialSegments')} />
                </label>
                <br />
                <label>
                    Height Segments
                    <input type="number" defaultValue="1" onChange={this.onChange.bind(this, 'heightSegments')} />
                </label>
                <br />
                <label>
                    Open Ended
                    <input type="checkbox" defaultChecked={false} onChange={this.handleCheck.bind(this, 'openEnded')} />
                </label>
                <br />
                <label>
                    Theta Start
                    <input type="number" defaultValue="0" onChange={this.onChange.bind(this, 'thetaStart')} />
                </label>
                <br />
                <label>
                    Theta Length
                    <input type="number" defaultValue="6.28" onChange={this.onChange.bind(this, 'thetaLength')} />
                </label>
                <br />
                <Button onClick={this.handleAdd}>Add</Button>
                <AddGeometryRenderer geometry={this.state.geometry} />
            </ViewContainer>
        );
    }
}

AddConeGeometryView.propTypes = {
    callbacks: PropTypes.object.isRequired
};

export default AddConeGeometryView;
