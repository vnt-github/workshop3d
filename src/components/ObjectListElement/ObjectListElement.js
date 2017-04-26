import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
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

    handleClickChangeActive(id) {
        this.props.handleClick(id)
    }

    render() {
        let list;
        if (this.state.isOpen) {
            list = <ul className="object-list__list">
                        <ReactCSSTransitionGroup transitionName="slide"
                                                 transitionEnterTimeout={500}
                                                 transitionLeaveTimeout={500} >
                            {this.props.list.map((element) => {
                                let className;
                                if (element.id === this.props.activeId) {
                                    className = "object-list__active";
                                }
                                return (
                                    <Link key={element.id}
                                          to={this.props.link}
                                          onClick={this.handleClickChangeActive.bind(this, element.id)} >
                                        <li className={className} >
                                            {element.name}
                                        </li>
                                    </Link>
                                );
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
    list: PropTypes.array.isRequired,
    link: PropTypes.string.isRequired,
    handleClick: PropTypes.func.isRequired,
    activeId: PropTypes.string
};

export default ObjectListElement;
