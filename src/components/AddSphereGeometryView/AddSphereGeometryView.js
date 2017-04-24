import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import * as THREE from 'three';

import ViewContainer from '../ViewContainer/ViewContainer';
import ViewHeading from '../ViewHeading/ViewHeading';
import Button from '../Button/Button';
import AddGeometryRenderer from '../AddGeometryRenderer/AddGeometryRenderer';

class AddSphereGeometryView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            geometry: new THREE.SphereGeometry(1, 12, 12)
        };

        this.radius = 1;
        this.widthSegments = 12;
        this.heightSegments = 12;
        this.phiStart = 0;
        this.phiLength = 6.28;
        this.thetaStart = 0;
        this.thetaLength = 3.14;

        this.handleAdd = this.handleAdd.bind(this);
    }

    onChange(prop, e) {
        this[prop] = Number(e.target.value);
        let geometry = new THREE.SphereGeometry(
            this.radius,
            this.widthSegments,
            this.heightSegments,
            this.phiStart,
            this.phiLength,
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
                <ViewHeading>Add Sphere Geometry</ViewHeading>
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
                    Width Segments
                    <input type="number" defaultValue="12" onChange={this.onChange.bind(this, 'widthSegments')} />
                </label>
                <br />
                <label>
                    Height Segments
                    <input type="number" defaultValue="12" onChange={this.onChange.bind(this, 'heightSegments')} />
                </label>
                <br />
                <label>
                    Phi Start
                    <input type="number" defaultValue="0" onChange={this.onChange.bind(this, 'phiStart')} />
                </label>
                <br />
                <label>
                    Phi Length
                    <input type="number" defaultValue="6.28" onChange={this.onChange.bind(this, 'phiLength')} />
                </label>
                <br />
                <label>
                    Theta Start
                    <input type="number" defaultValue="0" onChange={this.onChange.bind(this, 'thetaStart')} />
                </label>
                <br />
                <label>
                    Theta Length
                    <input type="number" defaultValue="3.14" onChange={this.onChange.bind(this, 'thetaLength')} />
                </label>
                <br />
                <Link to="/edit/geometry"><Button onClick={this.handleAdd}>Add</Button></Link>
                <AddGeometryRenderer geometry={this.state.geometry} />
            </ViewContainer>
        );
    }
}

AddSphereGeometryView.propTypes = {
    callbacks: PropTypes.object.isRequired
};

export default AddSphereGeometryView;
