import React, { Component } from 'react';

import TitleBarButton from '../TitleBarButton/TitleBarButton';

import './TitleBarButtonsWrap.css';

import closeIcon from '../../images/windows-icons/close.svg';
import minimizeIcon from '../../images/windows-icons/minimize.svg';
import restoreIcon from '../../images/windows-icons/restore.svg';

class TitleBarButtonsWrap extends Component {
    constructor(props) {
        super(props);

        if (window.require) {
            const BrowserWindow = window.require('electron').remote;
            this.BrowserWindow = BrowserWindow;
        }

        this.handleWindowClose = this.handleWindowClose.bind(this);
        this.handleWindowMinimize = this.handleWindowMinimize.bind(this);
        this.handleWindowRestore = this.handleWindowRestore.bind(this);
    }

    handleWindowClose() {
        if (this.BrowserWindow) {
            this.BrowserWindow.getCurrentWindow().close();
        }
    }

    handleWindowMinimize() {
        if (this.BrowserWindow) {
            this.BrowserWindow.getCurrentWindow().minimize();
        }
    }

    handleWindowRestore() {
        if (this.BrowserWindow) {
            let currentWindow = this.BrowserWindow.getCurrentWindow();
            if (!currentWindow.isMaximized()) {
                currentWindow.maximize();
            } else {
                currentWindow.unmaximize();
            }
        }
    }

    render() {
        return (
            <div className="titlebar-buttons-wrap">
                <TitleBarButton image={minimizeIcon} alt="minimize" handleClick={this.handleWindowMinimize} />
                <TitleBarButton image={restoreIcon} alt="restore" handleClick={this.handleWindowRestore} />
                <TitleBarButton image={closeIcon} alt="close" handleClick={this.handleWindowClose} />
            </div>
        );
    }
}

export default TitleBarButtonsWrap;
