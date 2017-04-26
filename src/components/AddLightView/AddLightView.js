import React, { Component } from 'react';

import ViewContainer from '../ViewContainer/ViewContainer';
import ViewHeading from '../ViewHeading/ViewHeading';
import LightLinkList from '../LightLinkList/LightLinkList';

class AddLightView extends Component {
    render() {
        return (
            <ViewContainer>
                <ViewHeading>Add Light</ViewHeading>
                <LightLinkList />
            </ViewContainer>
        );
    }
}

export default AddLightView;
