import {Store} from 'flummox';
import {doAsync, doAsyncModal} from './api';


export default class extends Store {
    constructor(flux) {
        super();
        const action = flux.getActionIds('profile');
        doAsync(this, action.getProfile);
        doAsync(this, action.getProfileFacebook);
        doAsync(this, action.logout);

        doAsyncModal(this, action.edit);
    }
}
