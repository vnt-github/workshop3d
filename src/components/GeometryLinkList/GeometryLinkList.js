import React, { Component } from 'react';

import ViewLinkList from '../ViewLinkList/ViewLinkList';

class GeometryLinkList extends Component {
    render () {
        let list = [
            { id: 0, name: 'Box', link: '/add/geometry/box' },
            { id: 1, name: 'Sphere', link: '/add/geometry/sphere' }
        ];

        return (
            <ViewLinkList list={list} />
        );
    }
}

export default GeometryLinkList;
