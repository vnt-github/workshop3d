import React, { Component, PropTypes } from 'react';
import * as THREE from 'three';

import ViewContainer from '../ViewContainer/ViewContainer';
import ViewHeading from '../ViewHeading/ViewHeading';
import Button from '../Button/Button';
import AddGeometryRenderer from '../AddGeometryRenderer/AddGeometryRenderer';

class AddIcosahedronGeometryView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            geometry: new THREE.IcosahedronGeometry(1, 0)
        };

        this.radius = 1;
        this.detail = 0;

        this.handleAdd = this.handleAdd.bind(this);
    }

    onChange(prop, e) {
        this[prop] = Number(e.target.value);
        let geometry = new THREE.IcosahedronGeometry(
            this.radius,
            this.detail
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
                <ViewHeading>Add Icosahedron Geometry</ViewHeading>
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
                    Detail
                    <input type="number" defaultValue="0" onChange={this.onChange.bind(this, 'detail')} />
                </label>
                <br />
                <Button onClick={this.handleAdd}>Add</Button>
                <AddGeometryRenderer geometry={this.state.geometry} />
            </ViewContainer>
        );
    }
}

AddIcosahedronGeometryView.propTypes = {
    callbacks: PropTypes.object.isRequired
};

export default AddIcosahedronGeometryView;
