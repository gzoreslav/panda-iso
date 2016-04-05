import _ from  'lodash';

export const sexFormatter = {
    componentWillMount() {

        _.merge(this, {
            formatters: {
                sex(value) {
                    return value === 'm' ? 'чол.' : value === 'f' ? 'жін.' : 'невідомо';
                }
            }
        });
    }
};