import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';

import './styles/reset.css';
import './styles/fonts.css';
import './styles/index.css';
import './styles/transitions.css';

import App from './components/App/App';

ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById('root')
);
