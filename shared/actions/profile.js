import {Actions} from 'flummox';
import {GET, PUT} from './api.js';
import request from 'superagent';
import config from '../../config/default.js';


export default class extends Actions {

    fetch(flux) {
        return GET(flux, '/api/users');
    }

    getProfile(flux, id) {
        return GET(flux, `/api/profile/${id}`);
    }

    getProfileFacebook(flux, data) {
        return new Promise((resolve, reject) => {
            request.post(`${config.api}/api/login`)
                .send(data)
                .end((error, response) => {
                    if (error) return reject(error);
                    var token = response.body.id_token;
                    request.get(`${config.api}/api/profile`)
                        .set('Authorization', 'Bearer ' + token)
                        .end((error, response) => {
                            if (error) {
                                const resp = error.timeout
                                    ? {
                                    status: '408',
                                    statusText: 'Час відповіді минув',
                                    text: `Запит до сервера тривав більше ${config.timeout/1000}с, перевірте зв\'язок з інтернетом`
                                } : error.response;
                                flux.getActions('messages').error(resp);
                                return reject(resp);
                            }
                            localStorage.setItem('token', token);
                            localStorage.setItem('id', response.body.id);
                            localStorage.setItem('role', response.body.role);
                            resolve(response.body);
                        });
                });
        });
    }

    edit(flux, data, token) {
        return PUT(flux, '/api/profile', data, token);
    }

    logout() {
        return new Promise((resolve) => {
            localStorage.removeItem('token');
            localStorage.removeItem('id');
            localStorage.removeItem('role');
            resolve({});
        });
    }
}
