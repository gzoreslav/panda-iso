import React from 'react';
import {RouteHandler} from 'react-router';
import {Header, Footer} from './common/index.jsx';

class AppHandler extends React.Component {
    render() {
        return (
            <div>
                <Header/>
                    <RouteHandler {...this.props} key={this.props.pathname} />
                <Footer/>
            </div>
        );
    }
}

export default AppHandler;
