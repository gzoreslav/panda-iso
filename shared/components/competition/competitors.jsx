import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import config from '../../../config/default.js';
import {Table, Alert, Glyphicon, Button} from 'react-bootstrap';
import Loading from '../Loader.jsx';
import {sexFormatter} from '../../mixins/formatter';
import auth from '../../mixins/auth';
import pagination from '../../mixins/pagination';
import constants from '../../constants';
import TablePaginations from '../paginations.jsx';

export default React.createClass({
    getInitialState() {
        return {
            loading: true,
            data: {},
            activePage: 1
        };
    },
    componentWillReceiveProps(nextProps) {
        this.setState(nextProps);
    },
    onPageChange(e, event) {
        this.setState({
            activePage: event.eventKey
        });
    },
    render() {
        const table = ((_.get(this.props, 'data.data', []).length === 0)  &&
            (!this.state.loading || this.props.loading)) ?
            <Alert bsStyle="info" style={{marginTop: '20px'}}>
                <Glyphicon glyph="info-sign"/> Немає зареєстрованих учасників або дані ще не внесені
            </Alert> :
            <Table responsive condensed striped>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Ім'я</th>
                    <th>Стать</th>
                    <th>Стартовий номер</th>
                    <th>Нікнейм</th>
                    <th>Клуб</th>
                    <th>Локація</th>
                    <th>Профайл</th>
                </tr>
                </thead>
                <Rows
                    data={this.props.data.data}
                    activePage={this.state.activePage}
                    itemsPerPage={constants.itemsPerPage.results}
                />
            </Table>;
        return (
            <Loading loading={this.state.loading || this.props.loading}>
                {table}
                <TablePaginations
                    activePage={this.state.activePage}
                    itemsPerPage={constants.itemsPerPage.results}
                    data={_.get(this.props, 'data.data', [])}
                    onPageChange={this.onPageChange}
                />
            </Loading>
        );
    }
});

const Rows = React.createClass({
    mixins: [
        sexFormatter,
        auth,
        pagination
    ],
    render: function() {
        const showMarkButton = this.auth.logged
            ? (_.findIndex(this.props.data, (c) => { return (c.id_user == this.auth.id); }) === -1)
            : false;
        const rows = this.props.data
            .map((c, i) =>
                this.checkPage(i) ?
                    <tr
                        className={classNames({
                            norun: c.results === 0,
                            me: c.id_user == this.auth.id
                        })}
                        key={c.id}
                    >
                        <td><span className="pull-right">{i + 1}</span></td>
                        <td>{c.lastname} {c.firstname}</td>
                        <td>{this.formatters.sex(c.sex)}</td>
                        <td>{c.number}</td>
                        <td>{c.nickname}</td>
                        <td>{c.club}</td>
                        <td>{c.location}</td>
                        <td>{c.id_user != 0
                            ? <a href={`/profiles/${c.id_user}`}>профайл</a>
                            : showMarkButton ? <MarkMe id={c.id}/> : null}
                        </td>
                    </tr>
                    : null
            );
        return (
            <tbody>{rows}</tbody>
        );
    }
});

const MarkMe = React.createClass({
    render() {
        return (
            <Button bsStyle="link">
                <Glyphicon glyph="pushpin"/>&nbsp;це я
            </Button>
        );
    }
});
