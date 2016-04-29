import React from 'react';
import {Glyphicon} from 'react-bootstrap';
import Flux from 'flummox/component';
import Articles from '../components/Articles.jsx';
import Slider from '../components/Slider.jsx';
import {SocialFB} from '../components/social.jsx';
import {staticActions} from '../mixins/fluxActions';
import DocumentTitle from 'react-document-title';


const Handler = React.createClass({
    render() {
        return (
            <DocumentTitle title="PandaRUN - Новини">
                <div style={{position: 'relative', top: '100px'}}>
                    <Slider/>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-8">
                                <Flux connectToStores={['articles']}>
                                    <Articles/>
                                </Flux>
                            </div>
                            <div className="col-sm-4">
                                <SocialFB/>
                                <hr/>
                                <div className="alert alert-info" role="alert">
                                    <p><strong><Glyphicon glyph="info-sign"/> Як оновлюються дані?</strong></p>
                                    <p>На даний час адміністративна частина ще не готова. Якщо ви організатор чи просто маєте
                                    протоколи (результати) і хочете, щоб ми їх розмістили то надсилайте нам інформацію
                                    на <a href="mailto:info@pandarun.com.ua">info@pandarun.com.ua</a> або контактуйте в
                                    соцмережах.</p>
                                </div>
                                <h5 className="text-success partners">Друзі:</h5>
                                <div>
                                    <a href="http://velo-stalker.if.ua/" target="_blank">
                                        <img src="http://velo-stalker.if.ua/images/button.png" width="96" height="44"
                                        alt="Клуб «velo–stalker» – цікаві поїздки, нові знайомства, багато позитивних емоцій
                                        та вражень" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DocumentTitle>
        );
    }
});

Handler.routerWillRun = async ({flux}) => {
    const actions = staticActions(flux);
    (typeof window !== 'undefined')
        ? actions.articles.getArticles(flux)
        : await actions.articles.getArticles(flux);
};

export default Handler;
