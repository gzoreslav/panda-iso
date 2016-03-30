import request from 'superagent';
import config from '../../config/default.js';


export const GET = (flux, url) => {
    return new Promise((resolve, reject) => {
        request.get(`${config.api}${url}`)
            .timeout(config.timeout)
            .end((error, response) => {
                if (error) {
                    const resp = error.timeout
                        ? {
                        status: '408',
                        statusText: 'Час відповіді минув',
                        text: `Запит до сервера тривав більше ${config.timeout/1000}с, перевірте зв\'язок з інтернетом`
                    } : error.response;
                    console.warn(resp);
                    if (resp.statusText.toLowerCase() === 'unauthorized') {
                        flux.getActions('profile').logout();
                    }
                    flux.getActions('messages').error(resp);
                    return reject(resp);
                }
                resolve(response.body);
            });
    });
};

export const PUT = (flux, url, data, token) => {
    return new Promise((resolve, reject) => {
        request.put(`${config.api}${url}`)
            .set('Authorization', 'Bearer ' + token)
            .send(data)
            .timeout(config.timeout)
            .end((error, response) => {
                if (error) {
                    const resp = error.timeout
                        ? {
                        status: '408',
                        statusText: 'Час відповіді минув',
                        text: `Запит до сервера тривав більше ${config.timeout/1000}с, перевірте зв\'язок з інтернетом`
                    } : error.response;
                    console.warn(resp);
                    if (resp.statusText.toLowerCase() === 'unauthorized') {
                        flux.getActions('profile').logout();
                    }
                    flux.getActions('messages').error(resp);
                    return reject(resp);
                }
                flux.getActions('messages').success({text: 'Дані успішно змінено'});
                resolve(response.body);
            });
    });
};
