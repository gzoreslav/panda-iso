import _ from  'lodash';
import actions from '../actions';


export const staticActions = (flux) => {
    const result = {};
    _.mapKeys(actions, (action, key) => {
        result[key.toLowerCase()] = flux.getActions(key.toLowerCase());
    });
    return result;
};

export default {
    componentWillMount() {
        this.actions = staticActions(this.props.flux);
    }
};
