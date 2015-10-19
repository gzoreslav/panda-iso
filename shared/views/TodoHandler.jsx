import React from 'react';
import Flux from 'flummox/component';
import Articles from '../components/Articles';

class TodoHandler extends React.Component {
    static async routerWillRun({flux, state}) {
        let action = state.routes[state.routes.length - 1].name;
        let articleActions = flux.getActions('articles');
        await articleActions.getTasks();
    }

    render() {
        return (
            <div>
                <header className="header">
                    <h1>Новини</h1>
                </header>
                <section className="main">
                    <Flux connectToStores={['articles']}>
                        <Articles/>
                    </Flux>
                </section>
            </div>
        );
    }
}

export default TodoHandler;
