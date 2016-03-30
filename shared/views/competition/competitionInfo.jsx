import React from 'react';
import Flux from 'flummox/component';
import CompetitionInfo from '../../components/competition/CompetitionInfo.jsx';
import {staticActions} from '../../mixins/fluxActions';


const Handler = React.createClass({
    render() {
        return (
            <Flux connectToStores={['competition']}>
                <CompetitionInfo/>
            </Flux>
        );
    }
});

Handler.routerWillRun = async ({flux, state}) => {
    const actions = staticActions(flux);
    (typeof window !== 'undefined')
        ? actions.competitions.getCompetition(flux, state.params.id)
        : await actions.competitions.getCompetition(flux, state.params.id);
};

export default Handler;
