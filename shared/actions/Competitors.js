import {Actions} from 'flummox';
import request from 'superagent';

const API_HOST = 'http://188.166.47.232:3004';

class CompetitorsActions extends Actions {

    getCompetitors() {
        return new Promise((resolve, reject) => {
            request.get(`${API_HOST}/api/users`)
                .end((error, response) => {
                    if (error) return reject(error);
                    resolve(response.body);
                });
        });
    }

    getCompetitor(id) {
        return new Promise((resolve, reject) => {
            request.get(`${API_HOST}/api/users/${id}`)
                .end((error, response) => {
                    if (error) return reject(error);
                    resolve(response.body);
                });
        });
    }

}

export default CompetitorsActions;
