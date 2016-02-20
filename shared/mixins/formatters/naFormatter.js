import React from 'react';
import _ from  'lodash';

export const naFormatter = {
    componentWillMount() {

        _.merge(this, {
            formatters: {
                na(value) {
                    return (value === 'n/a') || (value === 'undefined') ? <span className="n-a">{value}</span> : value;
                }
            }
        });
    }
};