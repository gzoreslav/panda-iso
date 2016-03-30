import React from 'react';
import {Alert, Glyphicon} from 'react-bootstrap';

export default React.createClass({
    render() {
        return (
            <Alert bsStyle="warning" style={{marginTop: '20px'}}>
                <strong><Glyphicon glyph="exclamation-sign"/> Сторінка розробляється</strong>&nbsp;
                Дана сторінка поки недоступна. Але ми працюємо над нею
            </Alert>
        );
    }
});
