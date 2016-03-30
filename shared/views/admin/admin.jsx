import React from 'react';
import {Nav, NavItem} from 'react-bootstrap';


export default React.createClass({
    render() {
        return (
            <Nav bsStyle="tabs" activeKey="competitions">
                <NavItem key="competitions" eventKey="competitions">Змагання</NavItem>
                <NavItem key="profiles" eventKey="profiles">Профайли</NavItem>
            </Nav>
        );
    }
});
