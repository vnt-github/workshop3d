import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import SidebarSingleButton from '../SidebarSingleButton/SidebarSingleButton';

class RenderPanel extends Component {
    render() {
        return (
            <Link to="/render">
                <SidebarSingleButton>Render</SidebarSingleButton>
            </Link>
        );
    }
}

export default RenderPanel;
