import {Store} from 'flummox';

class ResultsStore extends Store {
    constructor(flux) {
        super();

        let actions = flux.getActionIds('results');
        this.register(actions.getResults, this.handleResults);
    }

    handleResults(data) {
        this.setState({
            results: data ? data : []
        });
    }
}

export default ResultsStore;
