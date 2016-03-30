import {Actions} from 'flummox';


export default class extends Actions {

    error(resp) {
        return new Promise((resolve) => {
            resolve(resp);
        });
    }

    success(resp) {
        return new Promise((resolve) => {
            resolve(resp);
        });
    }

    hide() {
        return new Promise((resolve) => {
            resolve();
        });
    }
}
