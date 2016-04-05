import React from 'react';
import {Facebook} from '../mixins/social/Facebook.js';
import {Button, ButtonToolbar} from 'react-bootstrap';
import Breadcrumbs from '../components/breadcrumbs.jsx';


const LoginHandler = React.createClass({
    contextTypes: {
        router: React.PropTypes.func
    },
    mixins: [
        Facebook
    ],
    getInitialState() {
        return {
            status: 'unknown',
            loading: true
        }
    },
    render() {
        const token = (typeof localStorage !== 'undefined') ? localStorage.getItem('token') : '';
        if (token) {
            this.context.router.transitionTo('/profile');
        }
        return (
            <div className="container page-wrapper">
                <Breadcrumbs
                    crumbs={[
                        {link: '/', label: 'Головна'},
                        {label: 'Авторизація'}
                    ]}
                />
                <h4 className="title text-danger">Авторизація</h4>
                <hr className="colorgraph"/>
                <h5>Вам необхідно авторизуватись через одну із соцмереж:</h5>
                <ButtonToolbar>
                    <Button bsStyle="primary" onClick={this.doLogin}>Facebook</Button>
                    <Button bsStyle="danger" disabled>Google</Button>
                    <Button bsStyle="info" disabled>Twitter</Button>
                </ButtonToolbar>    
            </div>
        );
    }
});

export default LoginHandler;
