import React, { Component } from 'react';

import SidebarPanel from '../SidebarPanel/SidebarPanel';
import SidebarPanelLinkList from '../SidebarPanelLinkList/SidebarPanelLinkList';

class AddPanel extends Component {
    render() {
        let list = [
            { id: 0, name: 'Geometry', link: '/add/geometry' },
            { id: 1, name: 'Material', link: '/add/material' },
            { id: 2, name: 'Mesh', link: '/add/mesh' }
        ];
        return (
            <SidebarPanel heading="Add">
                <SidebarPanelLinkList list={list} />
            </SidebarPanel>
        );
    }
}

export default AddPanel;
