import React, { Component } from 'react';

import ViewContainer from '../ViewContainer/ViewContainer';
import ViewHeading from '../ViewHeading/ViewHeading';
import MaterialLinkList from '../MaterialLinkList/MaterialLinkList';

class AddMaterialView extends Component {
    render() {
        return (
            <ViewContainer>
                <ViewHeading>Add Material</ViewHeading>
                <MaterialLinkList />
            </ViewContainer>
        );
    }
}

export default AddMaterialView;
