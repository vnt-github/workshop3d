import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import * as THREE from 'three';

import ViewContainer from '../ViewContainer/ViewContainer';
import ViewHeading from '../ViewHeading/ViewHeading';
import Button from '../Button/Button';
import AddGeometryRenderer from '../AddGeometryRenderer/AddGeometryRenderer';

class AddTorusGeometryView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            geometry: new THREE.TorusGeometry(1, 0.5, 8, 6, Math.PI * 2)
        };

        this.radius = 1;
        this.tube = 0.5;
        this.radialSegments = 8;
        this.tubularSegments = 6;
        this.arc = Math.PI * 2;

        this.handleAdd = this.handleAdd.bind(this);
    }

    onChange(prop, e) {
        this[prop] = Number(e.target.value);
        let geometry = new THREE.TorusGeometry(
            this.radius,
            this.tube,
            this.radialSegments,
            this.tubularSegments,
            this.arc
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
                <ViewHeading>Add Torus Geometry</ViewHeading>
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
                    Radial Segments
                    <input type="number" defaultValue="8" onChange={this.onChange.bind(this, 'radialSegments')} />
                </label>
                <br />
                <label>
                    Tubular Segments
                    <input type="number" defaultValue="6" onChange={this.onChange.bind(this, 'tubularSegments')} />
                </label>
                <br />
                <label>
                    Arc
                    <input type="number" defaultValue="6.28" onChange={this.onChange.bind(this, 'arc')} />
                </label>
                <br />
                <Link to="/edit/geometry"><Button onClick={this.handleAdd}>Add</Button></Link>
                <AddGeometryRenderer geometry={this.state.geometry} />
            </ViewContainer>
        );
    }
}

AddTorusGeometryView.propTypes = {
    callbacks: PropTypes.object.isRequired
};

export default AddTorusGeometryView;
