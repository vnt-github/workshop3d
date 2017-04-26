import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import * as THREE from 'three';

import ViewContainer from '../ViewContainer/ViewContainer';
import ViewHeading from '../ViewHeading/ViewHeading';
import Button from '../Button/Button';

class AddAmbientLightView extends Component {
    constructor(props) {
        super(props);

        this.light = new THREE.AmbientLight(0x000000);

        this.handleAdd = this.handleAdd.bind(this);
        this.handleColorChange = this.handleColorChange.bind(this);
    }

    onChange(prop, e) {
        this.light[prop] = Number(e.target.value);
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
                <ViewHeading>Add Ambient Light</ViewHeading>
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
                <Link to="/"><Button onClick={this.handleAdd}>Add</Button></Link>
            </ViewContainer>
        );
    }
}

AddAmbientLightView.propTypes = {
    callbacks: PropTypes.object.isRequired
};

export default AddAmbientLightView;
