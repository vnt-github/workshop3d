import React, { Component } from 'react';

import TitleBar from '../TitleBar/TitleBar';
import StateWrapper from '../StateWrapper/StateWrapper';

import './App.css';

class App extends Component {
    render() {
        return (
            <div className="app">
                <TitleBar />
                <StateWrapper />
            </div>
        );
    }
}

export default App;
