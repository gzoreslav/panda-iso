import React from 'react';
import Flux from 'flummox/component';
import Category from '../../components/competition/Category.jsx';

class CategoryHandler extends React.Component {
    static async routerWillRun({flux, state}) {
        let categoryActions = flux.getActions('categories');
        let resultsActions = flux.getActions('results');
        try {
            if (typeof window !== 'undefined') {
                await categoryActions.getCategory(state.params.id);
                await resultsActions.getResults(state.params.id);
            } else {
                await categoryActions.getCategory(state.params.id);
                await resultsActions.getResults(state.params.id);
            }
        } catch(error) {
            console.log(error);
        }    
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
