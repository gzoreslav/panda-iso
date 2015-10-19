import React from 'react';
import Flux from 'flummox/component';
import Category from '../../components/competition/Category.jsx';

class CategoryHandler extends React.Component {
    static async routerWillRun({flux, state}) {
        let categoryActions = flux.getActions('categories');
        let resultsActions = flux.getActions('results');
        await categoryActions.getCategory(state.params.id);
        await resultsActions.getResults(state.params.id);
    }

    render() {
        return (
            <Flux connectToStores={['category','results']}>
                <Category/>
            </Flux>
        );
    }
}

export default CategoryHandler;
