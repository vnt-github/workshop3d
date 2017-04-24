import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import * as THREE from 'three';

import ViewContainer from '../ViewContainer/ViewContainer';
import ViewHeading from '../ViewHeading/ViewHeading';
import Button from '../Button/Button';
import AddGeometryRenderer from '../AddGeometryRenderer/AddGeometryRenderer';

class AddCircleGeometryView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            geometry: new THREE.CircleGeometry(1, 8)
        };

        this.radius = 1;
        this.segments = 8;
        this.thetaStart = 0;
        this.thetaLength = Math.PI * 2;

        this.handleAdd = this.handleAdd.bind(this);
    }

    onChange(prop, e) {
        this[prop] = Number(e.target.value);
        let geometry = new THREE.CircleGeometry(
            this.radius,
            this.segments,
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
                <ViewHeading>Add Circle Geometry</ViewHeading>
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
                    Segments
                    <input type="segments" defaultValue="8" onChange={this.onChange.bind(this, 'segments')} />
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

AddCircleGeometryView.propTypes = {
    callbacks: PropTypes.object.isRequired
};

export default AddCircleGeometryView;
