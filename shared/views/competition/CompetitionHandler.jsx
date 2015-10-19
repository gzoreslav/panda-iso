import React from 'react';
import Flux from 'flummox/component';
import Competition from '../../components/competition/Competition.jsx';

class CompetitionHandler extends React.Component {
    static async routerWillRun({flux, state}) {
        let competitionActions = flux.getActions('competitions');
        await competitionActions.getCompetition(state.params.id);
    }

    render() {
        return (
            <Flux connectToStores={['competition']}>
                <Competition/>
            </Flux>
        );
    }
}

export default CompetitionHandler;
