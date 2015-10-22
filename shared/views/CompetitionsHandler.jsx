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
                <ol className="breadcrumb" itemScope itemType="http://schema.org/BreadcrumbList">
                    <li itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
                        <a itemProp="item" href="/">
                            <span itemProp="name">Головна</span>
                        </a>
                    </li>
                    <li className="active" itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
                        <span itemProp="item">
                            <span itemProp="name">Змагання</span>
                        </span>    
                    </li>
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
