import React from 'react';
import Router from 'react-router';
import _ from 'lodash';
import {Button, Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import config from '../../config/default.js';
import {Facebook} from '../mixins/social/Facebook.js';
import {staticAuth} from '../mixins/auth';


const items = [
    {
        label: 'Календар',
        name: 'competitions'
    },
    {
        label: 'Учасники',
        name: 'profiles'
    },
    {
        label: 'Статистика',
        name: 'statistic'
    }
];

const NavItems = React.createClass({
    contextTypes: {
        router: React.PropTypes.func
    },
    mixins: [
        Router.State
    ],
    render () {
        const token = (typeof localStorage !== 'undefined') ? localStorage.getItem('token') : '';
        const routes = this.context.router.getCurrentRoutes();
        const links = _(items)
            .filter(item => item.name === 'profile' ? token : true )
            .map(item =>
                <NavItem
                    key={item.name}
                    active={routes[1].name === item.name}
                    disabled={item.disabled}
                    eventKey={item.name}
                    href={`${config.host}/${item.name}`}>
                    {item.label}
                </NavItem>
            )
            .value();
        return <Nav pullRight>{links}</Nav>;
    }
});

export default React.createClass({
    contextTypes: {
        router: React.PropTypes.func
    },
    mixins: [
        Router.State,
        Facebook
    ],
    logout() {
        this.props.flux.getActions('profile').logout();
        this.doLogout();
        this.context.router.transitionTo('/');
    },
    login() {
        this.context.router.transitionTo('/login');
    },
    render() {
        const auth = staticAuth();
        const admin = auth.logged && (auth.role == 'sa' || (auth.role == 'a') || (auth.role == 'ca'))
            ? <MenuItem key="admin" eventKey="admin"
                        href={`${config.host}/admin`}>
                Адміністрування
            </MenuItem>
            : null;
        const profileMenu = auth.logged ?
            <Nav pullRight>
                <NavDropdown key="auth" eventKey="auth" title={this.props.data.firstname} id="auth">
                    <MenuItem key="myprofile" eventKey="myprofile"
                        href={`${config.host}/profile`}>Профайл</MenuItem>
                    {admin}
                    <MenuItem key="divider" eventKey="divider" divider/>
                    <MenuItem key="logout" eventKey="logout"
                        onSelect={this.logout}>Вийти</MenuItem>
                </NavDropdown>
            </Nav> :
            <Navbar.Form pullRight>
                <Button style={{marginTop: "25px"}} bsStyle="primary" onClick={this.login}>Вхід</Button>
            </Navbar.Form>;
        return (
            <Navbar id="main-menu" fixedTop>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a itemProp="url" rel="home" href={config.host}>
                            <img itemProp="logo" src={`${config.host}/img/logo.png`} alt="logo"/>
                        </a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Navbar.Collapse>
                    {profileMenu}
                    <NavItems/>
                </Navbar.Collapse>
            </Navbar>
        );
    }
});
