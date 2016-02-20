import {Actions} from 'flummox';
import request from 'superagent';

const API_HOST = 'http://188.166.47.232:3004';

class ProfileActions extends Actions {

    getProfile(id) {
        return new Promise((resolve, reject) => {
            request.get(`${API_HOST}/api/users/${id}`)
                .end((error, response) => {
                    if (error) return reject(error);
                    resolve(response.body);
                });
        });
    }

    getProfileFacebook(data) {
        return new Promise((resolve, reject) => {
            request.post(`${API_HOST}/api/users/facebook`)
                .send(data)
                .end((error, response) => {
                    if (error) return reject(error);
                    resolve(response.body);
                });
        });
    }
}

export default ProfileActions;
