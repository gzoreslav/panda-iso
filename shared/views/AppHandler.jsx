import React from 'react';
import {RouteHandler} from 'react-router';
import {Header, Footer} from './common/index.jsx';
import Flux from 'flummox/component';

class AppHandler extends React.Component {
    render() {
    	if (typeof document !== 'undefined') {
    		(function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s);
                js.id = id;
                js.src = "//connect.facebook.net/uk_UA/sdk.js#xfbml=1&version=v2.5&appId=953645997999606";
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
        }    
        return (
            <div itemScope itemType="http://schema.org/Organization">
                <Flux connectToStores={['profile']}>
                    <Header/>
                </Flux>
                <RouteHandler {...this.props} key={this.props.pathname} />
                <Footer/>
            </div>
        );
    }
}

export default AppHandler;
