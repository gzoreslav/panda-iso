import {Store} from 'flummox';

class ResultsStore extends Store {
    constructor(flux) {
        super();
        let actions = flux.getActionIds('results');
        this.registerAsync(actions.getResults, null, this.handleResults, this.handleResultsFail);
        this.setState({
            error: false,
            loading: true,
            result: []
        });
    }

    handleResults(data) {
        this.setState({
            error: false,
            loading: false,
            result: data ? data : []
        });
    }

    handleResultsFail(resp) {
        this.setState({
            error: true,
            loading: false,
            resp: resp
        });
    }

}

export default ResultsStore;
