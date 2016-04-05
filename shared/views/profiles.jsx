import React from 'react';
import Flux from 'flummox/component';
import Profiles from '../components/profiles.jsx';
import Breadcrumbs from '../components/breadcrumbs.jsx';
import {staticActions} from '../mixins/fluxActions';


const Handler = React.createClass({
    render() {
        return (
            <div className="container page-wrapper">
                <Breadcrumbs
                    crumbs={[
                        {link: '/', label: 'Головна'},
                        {label: 'Учасники'}
                    ]}
                />
                <h4 className="title text-danger">Учасники</h4>
                <hr className="colorgraph"/>
                <Flux connectToStores={['profiles']}>
                    <Profiles/>
                </Flux>
            </div>
        );
    }
});

Handler.routerWillRun = async ({flux}) => {
    const actions = staticActions(flux);
    (typeof window !== 'undefined')
        ? actions.profile.fetch(flux)
        : await actions.profile.fetch(flux);
};

export default Handler;
