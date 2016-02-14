import {Actions} from 'flummox';
import request from 'superagent';

const API_HOST = 'http://188.166.47.232:3004';

class CompetitionsActions extends Actions {
    getCompetitions() {
        return new Promise((resolve, reject) => {
            request.get(`${API_HOST}/api/competitions`)
                .end((error, response) => {
                    if (error) return reject(response);
                    resolve(response.body);
                });
        });
    }

    getCompetition(id) {
        return new Promise((resolve, reject) => {
            request.get(`${API_HOST}/api/competitions/${id}`)
                .end((error, response) => {
                    if (error) return reject(error);
                    resolve(response.body);
                });
        });
    }

    getActiveTasks() {
        return new Promise((resolve, reject) => {
            request.get(`${API_HOST}/api/tasks/active`)
                .end((error, response) => {
                    if (error) return reject(error);
                    resolve(response.body);
                });
        });
    }

    getCompletedTasks() {
        return new Promise((resolve, reject) => {
            request.get(`${API_HOST}/api/tasks/completed`)
                .end((error, response) => {
                    if (error) return reject(error);
                    resolve(response.body);
                });
        });
    }

    deleteCompletedTasks() {
        return new Promise((resolve, reject) => {
            request.del(`${API_HOST}/api/tasks/completed`)
                .end((error, response) => {
                    if (error) return reject(error);
                    resolve(response.body);
                });
        });
    }

    createTask(task) {
        return new Promise((resolve, reject) => {
            request.post(`${API_HOST}/api/tasks`)
                .send(task)
                .end((error, response) => {
                    if (error) return reject(error);
                    resolve(response.body);
                });
        });
    }

    deleteTask(id) {
        return new Promise((resolve, reject) => {
            request.del(`${API_HOST}/api/tasks/${id}`)
                .end((error, response) => {
                    if (error) return reject(error);
                    resolve(response.body);
                });
        });
    }

    toggleTask(id, completed) {
        return new Promise((resolve, reject) => {
            request.put(`${API_HOST}/api/tasks/${id}`)
                .send({completed})
                .end((error, response) => {
                    if (error) return reject(error);
                    resolve(response.body);
                });
        });
    }

    toggleAll(completed) {
        return new Promise((resolve, reject) => {
            request.put(`${API_HOST}/api/tasks`)
                .send({completed})
                .end((error, response) => {
                    if (error) return reject(error);
                    resolve(response.body);
                });
        });
    }
}

export default CompetitionsActions;
