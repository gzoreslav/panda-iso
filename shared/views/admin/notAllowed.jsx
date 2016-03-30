import React from 'react';
import {Alert, Glyphicon} from 'react-bootstrap';

export default React.createClass({
    render() {
        return (
            <Alert bsStyle="danger" onDismiss={this.closeError}>
                <Glyphicon glyph="remove-circle"/>&nbsp;
                {this.props.logged
                    ? 'У Вас немає доступу до цієї сторінки. Зверніться до адміністратора.'
                    : 'Необхідно увійти'}
            </Alert>
        );
    }
});
