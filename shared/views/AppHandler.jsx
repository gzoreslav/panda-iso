import React from 'react';
import FluxComponent from 'flummox/component';
import {Glyphicon} from 'react-bootstrap';
import ScrollToTop from 'react-scroll-up';
import {RouteHandler} from 'react-router';
import Header from '../components/header.jsx';
import Footer from '../components/footer.jsx';
import Messages from '../components/Messages.jsx';
import {staticActions} from '../mixins/fluxActions';
import {staticAuth} from '../mixins/auth';
import DocumentTitle from 'react-document-title';


const Handler = React.createClass({
    propTypes: {
        pathname: React.PropTypes.string.isRequired
    },
    render() {
        return (
            <DocumentTitle title="PandaRUN - Каталог результатів змагань">
                <div itemScope itemType="http://schema.org/Organization">
                    <FluxComponent connectToStores={['myprofile']}>
                        <Header/>
                    </FluxComponent>
                    <FluxComponent connectToStores={['messages']}>
                        <Messages/>
                    </FluxComponent>
                    <RouteHandler {...this.props} key={this.props.pathname}/>
                    <Footer/>
                    <ScrollToTop
                        showUnder={160}
                        style={{position: 'fixed', bottom: 50, right: 30, cursor: 'pointer', transitionDuration: '0.2s',
                            transitionTimingFunction: 'linear', transitionDelay: '0s', backgroundColor: '#eee',
                            padding: '10px'
                        }}
                    >
                        <span>Нагору <Glyphicon glyph="triangle-top"/></span>
                    </ScrollToTop>
                </div>
            </DocumentTitle>
        );
    }
});

Handler.routerWillRun = async ({flux}) => {
    const actions = staticActions(flux);
    actions.messages.hide();
    const auth = staticAuth();
    if (auth.logged) {
        actions.myprofile.getProfile(flux, auth.id)
    }
};

export default Handler;
