import {Store} from 'flummox';

class CompetitionsStore extends Store {
    constructor(flux) {
        super();
        let actions = flux.getActionIds('competitions');
        this.registerAsync(actions.getCompetitions, this.handleInit, this.handleCompetitions, this.handleCompetitionsFail);
    }

    handleInit() {
        this.setState({
            error: false,
            loading: true,
            data: {
                data: []
            }
        });
    }

    handleCompetitions(data) {
        this.setState({
            error: false,
            loading: false,
            data: data ? data : []
        });
    }

    handleCompetitionsFail(resp) {
        this.setState({
            error: false,
            loading: false,
            data: resp
        });
    }

}

export default CompetitionsStore;
