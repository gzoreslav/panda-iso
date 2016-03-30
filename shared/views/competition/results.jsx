import React from 'react';
import FluxComponent from 'flummox/component';
import Results from '../../components/competition/Results.jsx';
import {staticActions} from '../../mixins/fluxActions';

const Handler = React.createClass({
    render() {
        return (
            <FluxComponent connectToStores={['results']}>
                <Results parentData={this.props.data}/>
            </FluxComponent>
        );
    }
});

Handler.routerWillRun = async ({flux, state}) => {
    const actions = staticActions(flux);
    (typeof window !== 'undefined')
        ? actions.results.getResults(flux, state.params.id)
        : await actions.results.getResults(flux, state.params.id);
};

export default Handler;
