import React from 'react';
import {Alert, Glyphicon} from 'react-bootstrap';

export default React.createClass({
    getInitialState() {
        return {
            showError: false,
            showSuccess: false
        }
    },
    componentWillReceiveProps(nextProps) {
        this.setState(nextProps);
    },
    closeError() {
        this.props.flux.getActions('messages').hide();
    },
    render() {
        return this.state.showError ?
                <div className="message error">
                    <Alert bsStyle="danger" onDismiss={this.closeError}>
                        <Glyphicon glyph="remove-circle"/>&nbsp;
                        {this.state.text}
                    </Alert>
                </div> :
        this.state.showSuccess ?
            <div className="message success">
                <Alert bsStyle="success" onDismiss={this.closeError}>
                    <Glyphicon glyph="ok-circle"/>&nbsp;
                    {this.state.text}
                </Alert>
            </div> : null;
    }
});
