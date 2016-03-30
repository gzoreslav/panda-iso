import {Store} from 'flummox';
import {doAsync} from './api';


export default class extends Store {
    constructor(flux) {
        super();
        const action = flux.getActionIds('myprofile');
        doAsync(this, action.getProfile);
        doAsync(this, action.getProfileFacebook);
        doAsync(this, action.logout);
    }
}
