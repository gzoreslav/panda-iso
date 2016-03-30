import {Store} from 'flummox';
import {doAsync} from './api';


export default class extends Store {
    constructor(flux) {
        super();
        doAsync(this, flux.getActionIds('category').getCategory);
    }
}
