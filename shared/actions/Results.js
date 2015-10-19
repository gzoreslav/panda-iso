import {Actions} from 'flummox';
import request from 'superagent';

const API_HOST = 'http://188.166.47.232:3004';

class ResultsActions extends Actions {
    getResults(id) {
        return new Promise((resolve, reject) => {
            request.get(`${API_HOST}/api/category/${id}/results`)
                .end((error, response) => {
                    if (error) return reject(error);
                    resolve(response.body);
                });
        });
    }
}

export default ResultsActions;
