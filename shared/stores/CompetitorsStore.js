import {Store} from 'flummox';

class CompetitorsStore extends Store {
    constructor(flux) {
        super();
        let actions = flux.getActionIds('competitors');
        this.registerAsync(actions.getCompetitors, this.hInit, this.hDone, this.hFail);
    }

    hInit() {
        this.setState({
            error: false,
            loading: true,
            data: {
                data: []
            }
        });
    }

    hDone(data) {
        this.setState({
            error: false,
            loading: false,
            data: data ? data : []
        });
    }

    hFail(resp) {
        this.setState({
            error: false,
            loading: false,
            data: resp
        });
    }

}

export default CompetitorsStore;
