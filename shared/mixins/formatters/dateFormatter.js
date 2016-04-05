import _ from  'lodash';
import moment from 'moment';
import constants from '../../constants';

export const dateFormatter = {
    componentWillMount() {
        _.merge(this, {
            formatters: {
                formatDate(value) {
                    if (!value) return value;
                    return moment(value+'').locale('uk').format(constants.formats.date);
                },
                birthday(value) {
                    if (!value) return value;
                    return moment(value+'').locale('uk').format(constants.formats.birthday);
                }
            }
        });
    }
};