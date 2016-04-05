import React from 'react';
import {Glyphicon} from 'react-bootstrap';

export const IconLabel = React.createClass({
    propTypes: {
        glyph: React.PropTypes.string,
        width: React.PropTypes.number,
        label: React.PropTypes.string,
        value: React.PropTypes.node.isRequired
    },
    render() {
        const glyph = this.props.glyph
            ? <Glyphicon style={{width: `${this.props.width}px` || '40px'}} glyph={this.props.glyph}/>
            : <span style={{width: `${this.props.width}px` || '40px', float: 'left', display: 'block', fontWeight: 'bold'}}>
                {this.props.label || '&nbsp;'}
            </span>;
        return (
            <div>
                {glyph}
                {this.props.value}
            </div>
        );
    }
});
