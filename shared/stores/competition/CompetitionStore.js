import {Store} from 'flummox';

class CompetitionsStore extends Store {
    constructor(flux) {
        super();

        let actions = flux.getActionIds('competitions');
        this.register(actions.getCompetition, this.handleCompetition);
    }

    handleCompetition(data) {
        this.setState({
            resp: data ? data : null
        });
    }
}

export default CompetitionsStore;
