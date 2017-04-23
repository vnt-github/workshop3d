import React, { Component, PropTypes } from 'react';
import * as THREE from 'three';

import ViewContainer from '../ViewContainer/ViewContainer';
import ViewHeading from '../ViewHeading/ViewHeading';
import Button from '../Button/Button';
import AddMaterialRenderer from '../AddMaterialRenderer/AddMaterialRenderer';

class AddLambertMaterialView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            color: '#ffffff',
            wireframe: false
        };

        this.material = new THREE.MeshLambertMaterial({ color: '#ffffff' });

        this.handleAdd = this.handleAdd.bind(this);
    }

    handleColorChange(e) {
        let color = new THREE.Color(e.target.value);
        this.material.color = color;
        this.setState({
            color: e.target.value
        });
    }

    handleCheck(prop, e) {
        this.material[prop] = e.target.checked;
        this.setState({
            [prop]: e.target.checked
        });
    }

    handleAdd() {
        this.material.name = this.nameElement.value;
        this.props.callbacks.handleMaterialAdd(this.material);
    }

    render() {
        return (
            <ViewContainer>
                <ViewHeading>Add Lambert Material</ViewHeading>
                <label>
                    Name
                    <input type="text" defaultValue="Material1" ref={(nameElement) => this.nameElement = nameElement} />
                </label>
                <br />
                <label>
                    Color
                    <input type="color" value={this.state.color} onChange={this.handleColorChange.bind(this)} />
                </label>
                <br />
                <label>
                    Wireframe
                    <input type="checkbox"
                           checked={this.state.wireframe}
                           onChange={this.handleCheck.bind(this, 'wireframe')} />
                </label>
                <br />
                <Button onClick={this.handleAdd}>Add</Button>
                <AddMaterialRenderer material={this.material} />
            </ViewContainer>
        );
    }
}

AddLambertMaterialView.propTypes = {
    callbacks: PropTypes.object.isRequired
};

export default AddLambertMaterialView;
