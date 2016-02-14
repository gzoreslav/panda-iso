import React from 'react';
import moment from 'moment';
import Loading from './Loader.jsx';
import {Nav, NavItem, Input} from 'react-bootstrap';

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
                                    <th>Локація</th>
                                    <th>Команда</th>
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
    render() {
        const rows = this.props.data
            .map(competitor => 
                <tr>
                    <td>{competitor.firstname}</td>
                    <td>{competitor.nickname}</td>
                    <td>{competitor.sex}</td>
                    <td>{competitor.location}</td>
                    <td>{competitor.team}</td>
                    <td>n/a</td>
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
