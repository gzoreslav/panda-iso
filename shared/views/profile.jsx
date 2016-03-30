import React from 'react';
import Profile from '../components/profile.jsx';
import FluxComponent from 'flummox/component';


export default class extends React.Component {
    static async routerWillRun({flux, state}) {
        let actions = flux.getActions('profile');
        if (typeof window !== 'undefined') {
            actions.getProfile(flux, state.params.id);
        } else {
            await actions.getProfile(flux, state.params.id);
        }     
    }

    render() {
        return (
            <FluxComponent connectToStores={['profile']}>
                <Profile/>
            </FluxComponent>
        );
    }
};
