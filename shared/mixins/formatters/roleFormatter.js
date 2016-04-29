import React from 'react';
import _ from  'lodash';

const roles = {
    c: 'Учасник',
    sa: 'Супер адміністратор',
    ca: 'Адміністратор змагання'
};

export const roleFormatter = {
    componentWillMount() {

        _.merge(this, {
            formatters: {
                role(value) {
                    const v = value || 'c';
                    return <span className={`role ${v}`}>{roles[v]}</span>;
                }
            }
        });
    }
};