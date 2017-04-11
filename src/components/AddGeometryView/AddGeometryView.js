import React, { Component } from 'react';

import ViewContainer from '../ViewContainer/ViewContainer';
import ViewHeading from '../ViewHeading/ViewHeading';
import GeometryLinkList from '../GeometryLinkList/GeometryLinkList';

class AddGeometryView extends Component {
    render() {
        return (
            <ViewContainer>
                <ViewHeading>Add Geometry</ViewHeading>
                <GeometryLinkList />
            </ViewContainer>
        );
    }
}

export default AddGeometryView;
