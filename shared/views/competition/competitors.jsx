import React from 'react';
import FluxComponent from 'flummox/component';
import Competitors from '../../components/competition/competitors.jsx';
import {staticActions} from '../../mixins/fluxActions';

const Handler = React.createClass({
    propTypes: {
        data: React.PropTypes.object
    },
    render() {
        return (
            <FluxComponent connectToStores={['competitors']}>
                <Competitors parentData={this.props.data}/>
            </FluxComponent>
        );
    }
});

Handler.routerWillRun = async ({flux, state}) => {
    const actions = staticActions(flux);
    (typeof window !== 'undefined')
        ? actions.competitors.fetchForCategory(flux, state.params.id)
        : await actions.competitors.fetchForCategory(flux, state.params.id);
};

export default Handler;
