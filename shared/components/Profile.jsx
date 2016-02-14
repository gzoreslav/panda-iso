import React from 'react';
import Router from 'react-router';
import Flux from '../Flux.js';
import FluxComponent from 'flummox/component';
import {Button} from 'react-bootstrap';
import Loading from './Loader.jsx';
import {Facebook} from '../mixins/social/Facebook.js';
import MyProfile from './MyProfile.jsx';

const Profile = React.createClass({
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
        if ((this.props.status === 'connected') && !this.props.loading) {
            this.fetchData(this.fetchProfile);
        }
	},
    componentWillReceiveProps(nextProps) {
        this.setState({
            status: nextProps.status,
            loading: nextProps.loading
        });
        if ((nextProps.status === 'connected') && !nextProps.loading) {
            this.fetchData(this.fetchProfile);
        }
    },
    fetchProfile() {
        let profileActions = this.flux.getActions('profile');
        try {
            profileActions.getProfileFacebook(this.state.data.id, this.state.data);
        } catch(error) {
            console.log(error);
        }
    },
    componentWillMount() {
        this.flux = new Flux();
    },
    render() {
        if ((this.state.status !== 'connected') && !this.state.loading) {
            this.context.router.transitionTo('/login');
        }
        return (
            <Loading loading={this.state.loading}>
                <div className="row">
                    <div className="col-xs-10">
                        <FluxComponent flux={this.flux} connectToStores={['profile']}>
                            <MyProfile/>
                        </FluxComponent>
                    </div>
                    <div className="col-xs-2">
                        <Button bsStyle="danger" className="pull-right" onClick={this.logout}>Bийти</Button>
                    </div>
                </div>        
            </Loading>    
        );
    }
});

export default Profile;
