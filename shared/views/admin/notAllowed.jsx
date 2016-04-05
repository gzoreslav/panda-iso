import React from 'react';
import {Alert, Glyphicon} from 'react-bootstrap';

export default React.createClass({
    propTypes: {
        logged: React.PropTypes.bool
    },
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
