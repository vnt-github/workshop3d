import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';

import './ViewLinkList.css';

class ViewLinkList extends Component {
    render() {
        return (
            <ul className="view-link-list">
                {this.props.list.map((element) => {
                    return <li key={element.id}>
                               <Link to={element.link}>{element.name}</Link>
                            </li>
                })}
            </ul>
        );
    }
}

ViewLinkList.propTypes = {
    list: PropTypes.array.isRequired
};

export default ViewLinkList;
