import React from 'react';
import Flux from 'flummox/component';
import {
    CompetitionsByType, CompetitionsByYear, CompetitionsTop, UsersBySex, General,
    CompetitionsLocation} from '../components/Statistic.jsx';
import {Panel} from 'react-bootstrap';
import Breadcrumbs from '../components/breadcrumbs.jsx';


class StatisticHandler extends React.Component {
    static async routerWillRun({flux}) {
        const actions = flux.getActions('statistic');
        if (typeof window !== 'undefined') {
            actions.getCompetitionsByType();
            actions.getCompetitionsByYear();
            actions.getCompetitionsTop();
            actions.getUsersBySex();
            actions.getGeneral();
            actions.getLocation();
        } else {
            await actions.getCompetitionsByType();
            await actions.getCompetitionsByYear();
            await actions.getCompetitionsTop();
            await actions.getUsersBySex();
            await actions.getGeneral();
            await actions.getLocation();
        }    
    }

    render() {
        return (
            <div className="container page-wrapper">
                <Breadcrumbs
                    crumbs={[
                        {link: '/', label: 'Головна'},
                        {label: 'Статистика'}
                    ]}
                />
                <h4 className="title text-danger">Статистика</h4>
                <hr className="colorgraph"/> 
                <div className="row">
                    <div className="col-xs-3">
                        <Panel header="Загальні дані" bsStyle="primary">
                            <Flux connectToStores={['general']}>
                                <General/>
                            </Flux>
                        </Panel>
                    </div>
                    <div className="col-xs-5">
                        <Panel header="Кількість змагань за останні 10 років" bsStyle="primary">
                            <Flux connectToStores={['competitionsbyyear']}>
                                <CompetitionsByYear/>
                            </Flux>
                        </Panel>
                    </div>
                    <div className="col-xs-4">
                        <Panel header="Розподіл змагань по типу" bsStyle="primary">
                            <Flux connectToStores={['competitionsbytype']}>
                                <CompetitionsByType/>
                            </Flux>
                        </Panel>
                    </div>
                </div>

                <div className="row">
                    <div className="col-xs-4">
                        <div className="panel panel-primary">
                            <div className="panel-heading">Топ 10 змагань за кількістю учасників</div>
                            <Flux connectToStores={['competitionstop']}>
                                <CompetitionsTop/>
                            </Flux>
                        </div>
                    </div>
                    <div className="col-xs-4">
                        <div className="panel panel-primary">
                            <div className="panel-heading">Топ 10 локацій за кількістю змагань</div>
                            <Flux connectToStores={['location']}>
                                <CompetitionsLocation/>
                            </Flux>
                        </div>
                    </div>
                    <div className="col-xs-4">
                        <Panel header="Розподіл учасників по статі" bsStyle="primary">
                            <Flux connectToStores={['usersbysex']}>
                                <UsersBySex/>
                            </Flux>
                        </Panel>
                    </div>
                </div>
            </div>
        );
    }
}

export default StatisticHandler;
