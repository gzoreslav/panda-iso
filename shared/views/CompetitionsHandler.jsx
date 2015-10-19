import React from 'react';
import Flux from 'flummox/component';
import Competitions from '../components/Competitions.jsx';

class CompetitionsHandler extends React.Component {
    static async routerWillRun({flux, state}) {
        let competitionActions = flux.getActions('competitions');
        await competitionActions.getCompetitions();
    }

    render() {
        return (
            <div className="container page-wrapper">
                <ol className="breadcrumb">
                    <li><a href="#">Головна</a></li>
                    <li className="active">Змагання</li>
                </ol>
                <h4 className="title text-danger">Змагання</h4>
                <hr className="colorgraph"/>
                <Flux connectToStores={['competitions']}>
                    <Competitions/>
                </Flux>
            </div>
        );
    }
}

export default CompetitionsHandler;
