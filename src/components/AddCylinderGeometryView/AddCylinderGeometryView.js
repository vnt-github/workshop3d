import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import * as THREE from 'three';

import ViewContainer from '../ViewContainer/ViewContainer';
import ViewHeading from '../ViewHeading/ViewHeading';
import Button from '../Button/Button';
import AddGeometryRenderer from '../AddGeometryRenderer/AddGeometryRenderer';

class AddCylinderGeometryView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            geometry: new THREE.CylinderGeometry(1, 1, 2, 8)
        };

        this.radiusTop = 1;
        this.radiusBottom = 1;
        this.height = 2;
        this.radiusSegments = 8;
        this.heightSegments = 1;
        this.openEnded = false;
        this.thetaStart = 0;
        this.thetaLength = 6.28;

        this.handleAdd = this.handleAdd.bind(this);
    }

    onChange(prop, e) {
        this[prop] = Number(e.target.value);
        let geometry = new THREE.CylinderGeometry(
            this.radiusTop,
            this.radiusBottom,
            this.height,
            this.radiusSegments,
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
        let geometry = new THREE.CylinderGeometry(
            this.radiusTop,
            this.radiusBottom,
            this.height,
            this.radiusSegments,
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
                <ViewHeading>Add Cylinder Geometry</ViewHeading>
                <label>
                    Name
                    <input type="text" defaultValue="Geometry1" ref={(nameElement) => this.nameElement = nameElement} />
                </label>
                <br />
                <label>
                    Radius Top
                    <input type="number" defaultValue="1" onChange={this.onChange.bind(this, 'radiusTop')} />
                </label>
                <br />
                <label>
                    Radius Bottom
                    <input type="number" defaultValue="1" onChange={this.onChange.bind(this, 'radiusBottom')} />
                </label>
                <br />
                <label>
                    Height
                    <input type="number" defaultValue="2" onChange={this.onChange.bind(this, 'height')} />
                </label>
                <br />
                <label>
                    Radius Segments
                    <input type="number" defaultValue="8" onChange={this.onChange.bind(this, 'radiusSegments')} />
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
                <Link to="/edit/geometry"><Button onClick={this.handleAdd}>Add</Button></Link>
                <AddGeometryRenderer geometry={this.state.geometry} />
            </ViewContainer>
        );
    }
}

AddCylinderGeometryView.propTypes = {
    callbacks: PropTypes.object.isRequired
};

export default AddCylinderGeometryView;
