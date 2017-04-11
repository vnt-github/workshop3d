import React, { Component } from 'react';

import ViewLinkList from '../ViewLinkList/ViewLinkList';

class MaterialLinkList extends Component {
    render() {
        let list = [
            { id: 0, name: 'Basic', link: '/add/material/basic' },
            { id: 1, name: 'Lambert', link: '/add/material/lambert' },
            { id: 2, name: 'Phong', link: '/add/material/phong' },
            { id: 3, name: 'Shader', link: '/add/material/shader' }
        ];

        return (
            <ViewLinkList list={list} />
        );
    }
}

export default MaterialLinkList;
