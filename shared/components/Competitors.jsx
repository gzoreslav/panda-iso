import React from 'react';
import moment from 'moment';
import Loading from './Loader.jsx';
import {Nav, NavItem, Input} from 'react-bootstrap';
import {naFormatter, dateFormatter, sexFormatter} from '../mixins/formatter';

const Competitors = React.createClass({
    getInitialState() {
        return {
          loading: false,  
          filter: {
            title: ''
          }
      }
    },
    rendered() {
        this.setState({loading: false});
    },
    render() {  
        return (
            <div className="row">
                <Loading loading={this.props.loading || this.state.loading}>
                    <div className="col-xs-12">
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>Ім&apos;я</th>
                                    <th>Нікнейм</th>
                                    <th>Стать</th>
                                    <th>Дата Народження</th>
                                    <th>Локація</th>
                                    <th>Клуб</th>
                                    <th>Змагань</th>
                                </tr>
                            </thead>
                            <Rows data={this.props.data.data}/>
                        </table>
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
        sexFormatter
    ],
    render() {
        const rows = this.props.data
            .map(competitor => 
                <tr>
                    <td>{`${competitor.firstname} ${competitor.lastname}`}</td>
                    <td>{competitor.nickname}</td>
                    <td>{this.formatters.sex(competitor.sex)}</td>
                    <td>{this.formatters.formatDate(competitor.birthday)}</td>
                    <td>{competitor.location}</td>
                    <td>{competitor.team}</td>
                    <td>{this.formatters.na('n/a')}</td>
                </tr>
            );
        return (
            <tbody>
                {rows}
            </tbody>
        );
    }
});

export default Competitors;
