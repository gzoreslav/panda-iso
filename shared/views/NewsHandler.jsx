import React from 'react';
import Flux from 'flummox/component';
import Articles from '../components/Articles.jsx';
import Slider from '../components/Slider.jsx';

class NewsHandler extends React.Component {
    static async routerWillRun({flux, state}) {
        let action = state.routes[state.routes.length - 1].name;
        let articleActions = flux.getActions('articles');
        await articleActions.getArticles();
    }
    render() {
        return (
            <div style={{position: "relative", top: "100px"}}>
                <Slider/>
                <div className="container page-wrapper-carusel">
                <div className="row">
                    <div className="col-sm-8">
                        <Flux connectToStores={['articles']}>
                            <Articles/>
                        </Flux>
                    </div>
                    <div className="col-sm-4">
                        <h5 className="text-success partners">Ми в соцмережах:</h5>
                        <div>
                            <div className="fb-page" 
                                data-href="https://www.facebook.com/pandaruncomua" 
                                data-small-header="true" 
                                data-adapt-container-width="true" 
                                data-hide-cover="false" 
                                data-show-facepile="true" 
                                data-show-posts="false">
                                    <div className="fb-xfbml-parse-ignore">
                                        <blockquote cite="https://www.facebook.com/pandaruncomua">
                                            <a href="https://www.facebook.com/pandaruncomua">Panda Run Community</a>
                                        </blockquote>
                                    </div>
                            </div>
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
            </div>
        );
    }
    componentDidMount() {
        if (typeof FB !== 'undefined') {
            FB.XFBML.parse();
        }
        (adsbygoogle = window.adsbygoogle || []).push({});
    }
}

export default NewsHandler;
