import React from 'react';
import Router from 'react-router';
import {Button} from 'react-bootstrap';
import {Facebook} from '../mixins/social/Facebook.js';

const SocialLogin = React.createClass({
	contextTypes: {
        router: React.PropTypes.func
    },
	mixins: [
		Facebook
	],
	getInitialState() {
		return {
            status: this.props.status,
			loading: this.props.loading,
			data: {}
		};
	},
    componentWillReceiveProps(nextProps) {
        this.setState({
            status: nextProps.status,
            loading: nextProps.loading
        });
    },
    render() {
    	if ((this.state.status === 'connected') && !this.state.loading) {
    		this.context.router.transitionTo('/profile');
    	}
        return (
        	<div>
        		<h4>Вам необхідно авторизуватись через одну із соцмереж:</h4>
				<Button onClick={this.login}>Facebook</Button>
			</div>	
        );
    }
});

export default SocialLogin;
