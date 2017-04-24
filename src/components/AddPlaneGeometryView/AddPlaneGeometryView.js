import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import * as THREE from 'three';

import ViewContainer from '../ViewContainer/ViewContainer';
import ViewHeading from '../ViewHeading/ViewHeading';
import Button from '../Button/Button';
import AddGeometryRenderer from '../AddGeometryRenderer/AddGeometryRenderer';

class AddPlaneGeometryView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            geometry: new THREE.PlaneGeometry(1, 1, 1, 1)
        };

        this.width = 1;
        this.height = 1;
        this.widthSegments = 1;
        this.heightSegments = 1;

        this.handleAdd = this.handleAdd.bind(this);
    }

    onChange(prop, e) {
        this[prop] = Number(e.target.value);
        let geometry = new THREE.PlaneGeometry(
            this.width,
            this.height,
            this.widthSegments,
            this.heightSegments
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
                <ViewHeading>Add Plane Geometry</ViewHeading>
                <label>
                    Name
                    <input type="text" defaultValue="Geometry1" ref={(nameElement) => this.nameElement = nameElement} />
                </label>
                <br />
                <label>
                    Width
                    <input type="number" defaultValue="1" onChange={this.onChange.bind(this, 'width')} />
                </label>
                <br />
                <label>
                    Height
                    <input type="number" defaultValue="1" onChange={this.onChange.bind(this, 'height')} />
                </label>
                <br />
                <label>
                    Width Segments
                    <input type="number" defaultValue="1" onChange={this.onChange.bind(this, 'widthSegments')} />
                </label>
                <br />
                <label>
                    Height Segments
                    <input type="number" defaultValue="1" onChange={this.onChange.bind(this, 'heightSegments')} />
                </label>
                <br />
                <Link to="/edit/geometry"><Button onClick={this.handleAdd}>Add</Button></Link>
                <AddGeometryRenderer geometry={this.state.geometry} />
            </ViewContainer>
        );
    }
}

AddPlaneGeometryView.propTypes = {
    callbacks: PropTypes.object.isRequired
};

export default AddPlaneGeometryView;
