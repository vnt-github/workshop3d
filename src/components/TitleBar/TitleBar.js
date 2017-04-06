import React, { Component } from 'react';

import Logo from '../Logo/Logo';
import TitleBarButtonsWrap from '../TitleBarButtonsWrap/TitleBarButtonsWrap';

import './TitleBar.css';

class TitleBar extends Component {
    render() {
        return (
            <header className="titlebar">
                <Logo />
                <TitleBarButtonsWrap />
            </header>
        );
    }
}

export default TitleBar;
