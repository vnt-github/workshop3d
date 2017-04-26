import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import * as THREE from 'three';

import ViewContainer from '../ViewContainer/ViewContainer';
import ViewHeading from '../ViewHeading/ViewHeading';
import Button from '../Button/Button';

class AddPointLightView extends Component {
    constructor(props) {
        super(props);

        this.light = new THREE.PointLight();

        this.handleAdd = this.handleAdd.bind(this);
        this.handleColorChange = this.handleColorChange.bind(this);
    }

    onChange(prop, e) {
        this.light[prop] = Number(e.target.value);
    }

    onPositionChange(prop, e) {
        this.light.position[prop] = Number(e.target.value);
    }

    handleAdd() {
        this.light.name = this.nameElement.value;
        this.props.callbacks.handleLightAdd(this.light);
    }

    handleColorChange(e) {
        let color = new THREE.Color(e.target.value);
        this.light.color = color;
    }

    render() {
        return (
            <ViewContainer>
                <ViewHeading>Add Point Light</ViewHeading>
                <label>
                    Name
                    <input type="text" defaultValue="Light1" ref={(nameElement) => this.nameElement = nameElement} />
                </label>
                <br />
                <label>
                    Color
                    <input type="color" defaultValue="000000" onChange={this.handleColorChange} />
                </label>
                <br />
                <label>
                    Intensity
                    <input type="number" defaultValue="1" onChange={this.onChange.bind(this, 'intensity')} />
                </label>
                <br />
                <label>
                    Distance
                    <input type="number" defaultValue="0" onChange={this.onChange.bind(this, 'distance')} />
                </label>
                <br />
                <label>
                    Decay
                    <input type="number" defaultValue="1" onChange={this.onChange.bind(this, 'decay')} />
                </label>
                <br />
                <label>
                    Position<br /><br />
                    X: 
                    <input type="number" defaultValue="0" onChange={this.onPositionChange.bind(this, 'x')} />
                    {' '}Y: 
                    <input type="number" defaultValue="0" onChange={this.onPositionChange.bind(this, 'y')} />
                    {' '}Z: 
                    <input type="number" defaultValue="0" onChange={this.onPositionChange.bind(this, 'z')} />

                </label>
                <br />
                <Link to="/"><Button onClick={this.handleAdd}>Add</Button></Link>
            </ViewContainer>
        );
    }
}

AddPointLightView.propTypes = {
    callbacks: PropTypes.object.isRequired
};

export default AddPointLightView;
