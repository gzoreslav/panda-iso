import {Actions} from 'flummox';
import {GET} from './api.js';


export default class extends Actions {

    fetchForCategory(flux, id) {
        return GET(flux, `/api/categories/${id}/competitors`);
    }

}
