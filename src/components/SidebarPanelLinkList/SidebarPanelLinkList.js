import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';

import './SidebarPanelLinkList.css';

class SidebarPanelLinkList extends Component {
    render() {
        return (
            <ul className="sidebar-panel-list">
                {this.props.list.map((element) => {
                    return <li key={element.id}>
                               <Link to={element.link}>{element.name}</Link>
                            </li>
                })}
            </ul>
        );
    }
}

SidebarPanelLinkList.propTypes = {
    list: PropTypes.array.isRequired
};

export default SidebarPanelLinkList;
