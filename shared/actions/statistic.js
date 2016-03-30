import {Actions} from 'flummox';
import {GET} from './api.js';


export default class extends Actions {

    getCompetitionsByType(flux) {
        return GET(flux, '/api/stat/competitions_by_type');
    }

    getCompetitionsByYear(flux) {
        return GET(flux, '/api/stat/competitions_by_year');
    }

    getCompetitionsTop(flux) {
        return GET(flux, '/api/stat/competitions_top');
    }

    getUsersBySex(flux) {
        return GET(flux, '/api/stat/users_sex');
    }

    getGeneral(flux) {
        return GET(flux, '/api/stat/general');
    }

    getLocation(flux) {
        return GET(flux, '/api/stat/location');
    }

}
