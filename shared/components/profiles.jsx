import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import {Table} from 'react-bootstrap';
import Loading from './Loader.jsx';
import {naFormatter, dateFormatter, sexFormatter, roleFormatter} from '../mixins/formatter';
import auth from '../mixins/auth';

export default React.createClass({
    getInitialState() {
        return {
            loading: false,
            filter: {
                title: ''
            },
            data: [],
            error: false
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
    render() {
        return (
            <div className="row">
                <Loading loading={this.props.loading || this.state.loading}>
                    <div className="col-xs-12">
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
                            <Rows data={this.state.data}/>
                        </Table>
                    </div>
                </Loading> 
            </div>
        );
    }
});

var Rows = React.createClass({
    mixins: [
        naFormatter,
        dateFormatter,
        sexFormatter,
        roleFormatter,
        auth
    ],
    render() {
        const rows = this.props.data
            .map(competitor =>
                <tr className={classNames({me: competitor.id == this.auth.id})}>
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
            );
        return (
            <tbody>
                {rows}
            </tbody>
        );
    }
});
