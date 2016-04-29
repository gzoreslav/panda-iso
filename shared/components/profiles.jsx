import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import {Table, Row, Col} from 'react-bootstrap';
import Loading from './Loader.jsx';
import TablePaginations from './paginations.jsx';
import {naFormatter, dateFormatter, sexFormatter, roleFormatter} from '../mixins/formatter';
import pagination from '../mixins/pagination';
import auth from '../mixins/auth';
import constants from '../constants';


export default React.createClass({
    propTypes: {
        loading: React.PropTypes.bool
    },
    getInitialState() {
        return {
            loading: false,
            filter: {
                title: ''
            },
            data: [],
            error: false,
            activePage: 1
        }
    },
    componentWillReceiveProps(nextProps) {
        this.setState({
            error: nextProps.error,
            loading: nextProps.loading,
            data: _.get(nextProps, 'data.data', [])
        });
    },
    close() {
        this.setState({ error: false });
    },
    onPageChange(e, event) {
        this.setState({
            activePage: event.eventKey
        });
    },
    render() {
        return (
            <Row>
                <Loading loading={this.props.loading || this.state.loading}>
                    <Col xs={12}>
                        <Table responsive condensed striped>
                            <thead>
                                <tr>
                                    <th>Ім&apos;я</th>
                                    <th>Роль</th>
                                    <th>Нікнейм</th>
                                    <th>Стать</th>
                                    <th>Дата Народження</th>
                                    <th>Локація</th>
                                    <th>Клуб</th>
                                    <th>Змагань</th>
                                </tr>
                            </thead>
                            <Rows
                                activePage={this.state.activePage}
                                itemsPerPage={constants.itemsPerPage.default}
                                data={this.state.data}/>
                        </Table>
                        <TablePaginations
                            activePage={this.state.activePage}
                            itemsPerPage={constants.itemsPerPage.default}
                            data={this.state.data}
                            onPageChange={this.onPageChange}
                        />
                    </Col>
                </Loading> 
            </Row>
        );
    }
});

const Rows = React.createClass({
    propTypes: {
        data: React.PropTypes.array
    },
    mixins: [
        naFormatter,
        dateFormatter,
        sexFormatter,
        roleFormatter,
        auth,
        pagination
    ],
    render() {
        const rows = this.props.data
            .map((competitor, i) => {
                return this.checkPage(i) ?
                    <tr key={competitor.id} className={classNames({me: competitor.id == this.auth.id})}>
                        <td><a href={`profiles/${competitor.id}`}>{competitor.firstname} {competitor.lastname}</a></td>
                        <td>{this.formatters.role(competitor.role)}</td>
                        <td>{competitor.nickname}</td>
                        <td>{this.formatters.sex(competitor.sex)}</td>
                        <td>{this.formatters.birthday(competitor.birthday)}</td>
                        <td>{competitor.location}</td>
                        <td>{competitor.team}</td>
                        <td>{
                            competitor.competitions == 0
                                ? this.formatters.na('n/a')
                                : <span className="val">{competitor.competitions}</span>
                        }</td>
                    </tr>
                    : null;
            });
        return (
            <tbody>
                {rows}
            </tbody>
        );
    }
});
