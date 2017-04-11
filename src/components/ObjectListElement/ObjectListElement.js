import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import './ObjectListElement.css';

class ObjectListElement extends Component {
    constructor(props) {
        super(props);

        this.state = { isOpen: false };
        
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({ isOpen: !this.state.isOpen });
    }

    render() {
        let list;
        if (this.state.isOpen) {
            list = <ul className="object-list__list">
                        <ReactCSSTransitionGroup transitionName="slide"
                                                 transitionEnterTimeout={500}
                                                 transitionLeaveTimeout={500} >
                            {this.props.list.map((element) => {
                                return <li key={element.uuid}>
                                           {element.name}
                                        </li>
                            })}
                        </ReactCSSTransitionGroup>
                    </ul>
        }

        return (
            <div>
                <div className="object-list__heading" onClick={this.handleClick}>
                    {this.props.heading}
                </div>
                <ReactCSSTransitionGroup transitionName="slide"
                                         transitionEnterTimeout={500}
                                         transitionLeaveTimeout={500} >
                    {list}
                </ReactCSSTransitionGroup>
            </div>
        );
    }
}

ObjectListElement.propTypes = {
    heading: PropTypes.string.isRequired,
    list: PropTypes.array.isRequired
};

export default ObjectListElement;
