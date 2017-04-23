import React, { Component, PropTypes } from 'react';
import * as THREE from 'three';

import ViewContainer from '../ViewContainer/ViewContainer';
import ViewHeading from '../ViewHeading/ViewHeading';
import Button from '../Button/Button';
import AddGeometryRenderer from '../AddGeometryRenderer/AddGeometryRenderer';

class AddTorusKnotGeometryView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            geometry: new THREE.TorusKnotGeometry(1, 0.5, 10, 8, 2, 3)
        };

        this.radius = 1;
        this.tube = 0.5;
        this.tubularSegments = 10;
        this.radialSegments = 8;
        this.p = 2;
        this.q = 3;

        this.handleAdd = this.handleAdd.bind(this);
    }

    onChange(prop, e) {
        this[prop] = Number(e.target.value);
        let geometry = new THREE.TorusKnotGeometry(
            this.radius,
            this.tube,
            this.tubularSegments,
            this.radialSegments,
            this.p,
            this.q
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
                <ViewHeading>Add Torus Knot Geometry</ViewHeading>
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
                    Tube
                    <input type="number" defaultValue="0.5" onChange={this.onChange.bind(this, 'tube')} />
                </label>
                <br />
                <label>
                    Tubular Segments
                    <input type="number" defaultValue="10" onChange={this.onChange.bind(this, 'tubularSegments')} />
                </label>
                <br />
                <label>
                    Radial Segments
                    <input type="number" defaultValue="8" onChange={this.onChange.bind(this, 'radialSegments')} />
                </label>
                <br />
                <label>
                    p
                    <input type="number" defaultValue="2" onChange={this.onChange.bind(this, 'p')} />
                </label>
                <br />
                <label>
                    q
                    <input type="number" defaultValue="3" onChange={this.onChange.bind(this, 'q')} />
                </label>
                <br />
                <Button onClick={this.handleAdd}>Add</Button>
                <AddGeometryRenderer geometry={this.state.geometry} />
            </ViewContainer>
        );
    }
}

AddTorusKnotGeometryView.propTypes = {
    callbacks: PropTypes.object.isRequired
};

export default AddTorusKnotGeometryView;
