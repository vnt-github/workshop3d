import React, { Component } from 'react';

import ViewLinkList from '../ViewLinkList/ViewLinkList';

class GeometryLinkList extends Component {
    render () {
        let list = [
            { id: 0, name: 'Box', link: '/add/geometry/box' },
            { id: 1, name: 'Circle', link: '/add/geometry/circle' },
            { id: 2, name: 'Cone', link: '/add/geometry/cone' },
            { id: 3, name: 'Cylinder', link: '/add/geometry/cylinder' },
            { id: 4, name: 'Dodecahedron', link: '/add/geometry/dodecahedron' },
            { id: 5, name: 'Icosahedron', link: '/add/geometry/icosahedron' },
            { id: 6, name: 'Octahedron', link: '/add/geometry/octahedron' },
            { id: 7, name: 'Plane', link: '/add/geometry/plane' },
            { id: 8, name: 'Ring', link: '/add/geometry/ring' },
            { id: 9, name: 'Sphere', link: '/add/geometry/sphere' },
            { id: 10, name: 'Tetrahedron', link: '/add/geometry/tetrahedron' },
            { id: 11, name: 'Torus', link: '/add/geometry/torus' },
            { id: 12, name: 'Torus Knot', link: '/add/geometry/torusknot' }
        ];

        return (
            <ViewLinkList list={list} />
        );
    }
}

export default GeometryLinkList;
