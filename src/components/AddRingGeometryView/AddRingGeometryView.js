import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import * as THREE from 'three';

import ViewContainer from '../ViewContainer/ViewContainer';
import ViewHeading from '../ViewHeading/ViewHeading';
import Button from '../Button/Button';
import AddGeometryRenderer from '../AddGeometryRenderer/AddGeometryRenderer';

class AddRingGeometryView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            geometry: new THREE.RingGeometry(1, 2, 8)
        };

        this.innerRadius = 1;
        this.outerRadius = 2;
        this.thetaSegments = 8;
        this.phiSegments = 1;
        this.thetaStart = 0;
        this.thetaLength = 6.28;

        this.handleAdd = this.handleAdd.bind(this);
    }

    onChange(prop, e) {
        this[prop] = Number(e.target.value);
        let geometry = new THREE.RingGeometry(
            this.innerRadius,
            this.outerRadius,
            this.thetaSegments,
            this.phiSegments,
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
                <ViewHeading>Add Ring Geometry</ViewHeading>
                <label>
                    Name
                    <input type="text" defaultValue="Geometry1" ref={(nameElement) => this.nameElement = nameElement} />
                </label>
                <br />
                <label>
                    Inner Radius
                    <input type="number" defaultValue="1" onChange={this.onChange.bind(this, 'innerRadius')} />
                </label>
                <br />
                <label>
                    Outer Radius
                    <input type="number" defaultValue="2" onChange={this.onChange.bind(this, 'outerRadius')} />
                </label>
                <br />
                <label>
                    Theta Segments
                    <input type="number" defaultValue="8" onChange={this.onChange.bind(this, 'thetaSegments')} />
                </label>
                <br />
                <label>
                    Phi Segments
                    <input type="number" defaultValue="1" onChange={this.onChange.bind(this, 'phiSegments')} />
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
                <Link to="/edit/geometry"><Button onClick={this.handleAdd}>Add</Button></Link>
                <AddGeometryRenderer geometry={this.state.geometry} />
            </ViewContainer>
        );
    }
}

AddRingGeometryView.propTypes = {
    callbacks: PropTypes.object.isRequired
};

export default AddRingGeometryView;
