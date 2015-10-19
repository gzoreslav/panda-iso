import {Store} from 'flummox';

class CompetitionsStore extends Store {
    constructor(flux) {
        super();

        let actions = flux.getActionIds('competitions');
        this.register(actions.getCompetitions, this.handleCompetitions);
    }

    handleCompetitions(data) {
        this.setState({
            data: data ? data : []
        });
    }

}

export default CompetitionsStore;
