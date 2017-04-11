import React, { Component } from 'react';

import './ViewHeading.css';

class ViewHeading extends Component {
    render() {
        return (
            <h1 className="view-heading">
                {this.props.children}
            </h1>
        );
    }
}

export default ViewHeading;
