import {Actions} from 'flummox';
import {GET} from './api.js';


export default class extends Actions {
    getCompetitions(flux) {
        return GET(flux, '/api/competitions');
    }

    getCompetition(flux, id) {
        return GET(flux, `/api/competitions/${id}`)
    }

    /*deleteCompletedTasks() {
        return new Promise((resolve, reject) => {
            request.del(`${config.api}/api/tasks/completed`)
                .end((error, response) => {
                    if (error) return reject(error);
                    resolve(response.body);
                });
        });
    }

    createTask(task) {
        return new Promise((resolve, reject) => {
            request.post(`${config.api}/api/tasks`)
                .send(task)
                .end((error, response) => {
                    if (error) return reject(error);
                    resolve(response.body);
                });
        });
    }

    deleteTask(id) {
        return new Promise((resolve, reject) => {
            request.del(`${config.api}/api/tasks/${id}`)
                .end((error, response) => {
                    if (error) return reject(error);
                    resolve(response.body);
                });
        });
    }

    toggleTask(id, completed) {
        return new Promise((resolve, reject) => {
            request.put(`${config.api}/api/tasks/${id}`)
                .send({completed})
                .end((error, response) => {
                    if (error) return reject(error);
                    resolve(response.body);
                });
        });
    }

    toggleAll(completed) {
        return new Promise((resolve, reject) => {
            request.put(`${config.api}/api/tasks`)
                .send({completed})
                .end((error, response) => {
                    if (error) return reject(error);
                    resolve(response.body);
                });
        });
    }*/
}
