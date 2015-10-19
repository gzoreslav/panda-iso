import React from 'react';
import Flux from 'flummox/component';
import Articles from '../components/Articles';

class NewsHandler extends React.Component {
    static async routerWillRun({flux, state}) {
        let action = state.routes[state.routes.length - 1].name;
        let articleActions = flux.getActions('articles');
        await articleActions.getArticles();
    }

    render() {
        return (
            <div className="container page-wrapper">
                <div className="row">
                    <div className="col-sm-8">
                        <Flux connectToStores={['articles']}>
                            <Articles/>
                        </Flux>
                    </div>
                    <div className="col-sm-4">
                        <div>
                            <div className="fb-like" data-href="http://pandarun.com.ua" data-layout="standard"
                                 data-action="like" data-show-faces="true" data-share="false"></div>
                        </div>
                        <hr/>
                        <div className="alert alert-info" role="alert">
                            <p><strong>Як оновлюються дані?</strong></p>
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
                        <br/>
                        <br/>
                        <div id="ads">
                            <ins className="adsbygoogle"
                                style={{display: "inline-block", width: "300px", height: "250px"}}
                                data-ad-client="ca-pub-7465983485505090"
                                data-ad-slot="9671261115"></ins>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default NewsHandler;
