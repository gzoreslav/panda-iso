import React from 'react';
import FluxComponent from 'flummox/component';
import Category from '../../components/competition/Category.jsx';
import {staticActions} from '../../mixins/fluxActions';

const Handler = React.createClass({
    render() {
        return (
            <FluxComponent connectToStores={['category']}>
                <Category/>
            </FluxComponent>
        );
    }
});

Handler.routerWillRun = async ({flux, state}) => {
    const actions = staticActions(flux);
    (typeof window !== 'undefined')
        ? actions.category.getCategory(flux, state.params.id)
        : await actions.category.getCategory(flux, state.params.id);
};

export default Handler;
