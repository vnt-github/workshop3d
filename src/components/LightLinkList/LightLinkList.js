import React, { Component } from 'react';

import ViewLinkList from '../ViewLinkList/ViewLinkList';

class LightLinkList extends Component {
    render () {
        let list = [
            { id: 0, name: 'Ambient', link: '/add/light/ambient' },
            { id: 1, name: 'Directional', link: '/add/light/directional' },
            { id: 2, name: 'Point', link: '/add/light/point' }
        ];

        return (
            <ViewLinkList list={list} />
        );
    }
}

export default LightLinkList;
