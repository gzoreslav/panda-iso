import React from 'react';
import Flux from 'flummox/component';
import Competitions from '../components/Competitions.jsx';
import Breadcrumbs from '../components/breadcrumbs.jsx';
import {staticActions} from '../mixins/fluxActions';


const Handler = React.createClass({
    render() {
        return (
            <div className="container page-wrapper">
                <Breadcrumbs
                    crumbs={[
                        {link: '/', label: 'Головна'},
                        {label: 'Календар'}
                ]}/>
                <h4 className="title text-danger">Календар</h4>
                <hr className="colorgraph"/>
                <Flux connectToStores={['competitions']}>
                    <Competitions/>
                </Flux>
            </div>
        );
    }
});

Handler.routerWillRun = async ({flux, state}) => {
    const actions = staticActions(flux);
    (typeof window !== 'undefined')
        ? actions.competitions.getCompetitions(flux)
        : await actions.competitions.getCompetitions(flux);
};

export default Handler;
