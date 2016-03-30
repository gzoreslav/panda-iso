import {Actions} from 'flummox';
import {GET} from './api.js';


export default class extends Actions {
    getCategory(flux, id) {
        return GET(flux, `/api/category/${id}`);
    }
}
