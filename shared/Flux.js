import {Flux} from 'flummox';
import _ from 'lodash';
import actions from './actions';
import stores from './stores';


export default class extends Flux {
    constructor() {
        super();

        //register all actions
        _.mapKeys(actions, (action, key) => {
            this.createActions(key.toLowerCase(), action, this);
        });

        //register all stores
        _.mapKeys(stores, (store, key) => {
            this.createStore(key.toLowerCase(), store, this);
        });

    }
}
