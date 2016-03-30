import React from 'react';
import moment from 'moment';
import config from '../../config/default.js';
import {OverlayTrigger, Tooltip} from 'react-bootstrap';
import {Facebook} from '../mixins/social/Facebook.js';

const Sharer = React.createClass({
    mixins: [
        Facebook
    ],
    render() {
        return <a href="#" className="share-fb" onClick={this.doShareResult}>share</a>
    }
});

export default Sharer; 
