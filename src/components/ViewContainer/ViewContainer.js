import React, { Component } from 'react';

import './ViewContainer.css';

class ViewContainer extends Component {
    render() {
        return (
            <div className="view-container">
                {this.props.children}
            </div>
        );
    }
}

export default ViewContainer;
