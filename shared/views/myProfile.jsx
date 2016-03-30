import React from 'react';
import FluxComponent from 'flummox/component';
import Profile from '../components/profile.jsx';
import FluxActions from '../mixins/fluxActions';
import {staticAuth} from '../mixins/auth';


export default React.createClass({
    contextTypes: {
        router: React.PropTypes.func
    },
    mixins: [
        FluxActions
    ],
    getInitialState() {
        return {
            status: 'unknown',
            loading: true,
            data: {}
        };
    },
    componentDidMount() {
        this.fetchProfile();
    },
    fetchProfile() {
        const auth = staticAuth();
        auth.logged
            ? this.actions.profile.getProfile(this.props.flux, auth.id)
            : this.context.router.transitionTo('/login');
    },
    render() {
        return (
            <FluxComponent connectToStores={['profile']}>
                <Profile/>
            </FluxComponent>
        );
    }
});
