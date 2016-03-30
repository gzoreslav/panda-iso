import React from 'react';
import Breadcrumbs from '../components/breadcrumbs.jsx';
import Admin from './admin/admin.jsx';
import NotAllowed from './admin/notAllowed.jsx';
import FluxActions from '../mixins/fluxActions';
import {staticAuth} from '../mixins/auth';


export default React.createClass({
    contextTypes: {
        router: React.PropTypes.func
    },
    mixins: [
        FluxActions
    ],
    fetchProfile() {
        const auth = staticAuth();
        auth.logged
            ? this.actions.profile.getProfile(this.props.flux, auth.id)
            : this.context.router.transitionTo('/login');
    },
    render() {
        return (
            <div className="container page-wrapper">
                <Breadcrumbs
                    crumbs={[
                        {link: '/', label: 'Головна'},
                        {label: 'Адміністрування'}
                ]}/>
                <h4 className="title text-danger">Адміністрування</h4>
                <hr className="colorgraph"/>
                {staticAuth().admin ? <Admin/> : <NotAllowed logged={staticAuth().logged}/>}
            </div>
        );
    }
});
