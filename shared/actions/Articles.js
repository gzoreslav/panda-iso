import {Actions} from 'flummox';
import {GET} from './api.js';


export default class extends Actions {

    getArticles(flux) {
        return GET(flux, '/api/articles');
    }

}
