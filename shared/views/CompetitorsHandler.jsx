import React from 'react';
import Flux from 'flummox/component';
import Competitors from '../components/Competitors.jsx';

class CompetitorsHandler extends React.Component {
    static async routerWillRun({flux, state}) {
        let actions = flux.getActions('competitors');
        if (typeof window !== 'undefined') {
            actions.getCompetitors();
        } else {
            await actions.getCompetitors();
        }    
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
                            <span itemProp="name">Учасники</span>
                        </span>    
                    </li>
                </ol>
                <h4 className="title text-danger">Авторизовані Учасники</h4>
                <hr className="colorgraph"/>
                <Flux connectToStores={['competitors']}>
                    <Competitors/>
                </Flux>
            </div>
        );
    }
}

export default CompetitorsHandler;
