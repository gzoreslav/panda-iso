import React from 'react';
import moment from 'moment';
import _ from 'lodash';
import {Doughnut, Bar} from 'react-chartjs';
import {Label} from 'react-bootstrap';
import Loading from './Loader.jsx';


export const CompetitionsByType = React.createClass({
    getInitialState() {
        return {
        	loading: true,
            error: false,
        	data: []
        };
    },
    componentWillReceiveProps(nextProps) {
        const colors = ["#8dd3c7","#ffffb3","#bebada","#fb8072","#80b1d3","#fdb462","#b3de69","#fccde5","#d9d9d9",
            "#bc80bd","#ccebc5","#ffed6f"];
        let data = _.get(nextProps, 'data.data', [])
            .map((item, i) => {
                return {
                    value: item.competitions_count,
                    label: item.title,
                    color: colors[i]
                }
            });     
        this.setState({
            loading: nextProps.loading,
            error: nextProps.error,
            data: data
        });
    },
    render() {
        const options = {
            animation: false,
            legendTemplate : "<ul><% for (var i=0; i<segments.length; i++){%><li><%=segments[i].label%></li><%}%></ul>"
        };
        return this.state.data.length > 0
            ? <Doughnut height="250" data={this.state.data} options={options}/>
            : <Loading loading={true}>Дані завантажуються ...</Loading>;
    }
});

export const CompetitionsByYear = React.createClass({
    getInitialState() {
        return {
            loading: true,
            error: false,
            data: []
        };
    },
    componentWillReceiveProps(nextProps) {
        let data = {
            labels: [],
            datasets: [{
                label: "Кількість змагань",
                fillColor: "#fb8072",
                strokeColor: "rgba(220,220,220,0.8)",
                highlightFill: "#fb8072",
                highlightStroke: "rgba(220,220,220,1)",
                data: []
            }]
        };
        const d = _.get(nextProps, 'data.data', []);
        for (var i = 0; i < d.length; i++) {
            data.labels.push(d[i].competition_year);
            data.datasets[0].data.push(d[i].competitions_count);
        }
        this.setState({
            loading: nextProps.loading,
            error: nextProps.error,
            data: data
        });
    },
    render() {
        const options = {
            animation: false
        };
        return !this.state.loading
            ? <Bar height="250" data={this.state.data} options={options}/>
            : <Loading loading={true}>Дані завантажуються ...</Loading>;
    }
});

const TopRows = React.createClass({
    render() {
        const rows = this.props.data
            .map(c => {
                return (
                    <tr>
                        <td>
                            <a href={`competitions/${c.id}`}>{c.title}</a>
                        </td>
                        <td><span className="pull-right">{c.competition_count}</span></td>
                    </tr>
                );
            });
        return (
            <tbody>
                {rows}
            </tbody>
        );
    }
});

export const CompetitionsTop = React.createClass({
    render() {
        return (
            <Loading loading={this.props.loading}>
                <table className="table table-striped">
                    <TopRows data={_.get(this.props, 'data.data', [])}/>
                </table>
            </Loading>
        );
    }
});

export const UsersBySex = React.createClass({
    getInitialState() {
        return {
            loading: true,
            error: false,
            data: []
        };
    },
    componentWillReceiveProps(nextProps) {
        const colors = ["#fdb462","#b3de69","#fccde5"];
        let data = _.get(nextProps, 'data.data', [])
            .map((item, i) => {
                return {
                    value: item.c,
                    label: item.sex === "m" ? "чоловіки" : item.sex === "f" ? "жінки" : "стать не вказана",
                    color: colors[i]
                }
            });     
        this.setState({
            loading: nextProps.loading,
            error: nextProps.error,
            data: data
        });
    },
    render() {
        const options = {
            animation: false,
            legendTemplate : "<ul><% for (var i=0; i<segments.length; i++){%><li><%=segments[i].label%></li><%}%></ul>"
        };
        return this.state.data.length > 0
            ? <Doughnut height="250" data={this.state.data} options={options}/>
            : <Loading loading={true}>Дані завантажуються ...</Loading>;
    }
});

const generalMap = {
    competitions: {
        label: "Змагань",
        type: "warning"
    },
    competiton_types: {
        label: "Типів змагань",
        type: "warning"
    },
    competitions_first: {
        label: "Перше змагання",
        type: "warning"
    },
    competitions_last: {
        label: "Останнє змагання",
        type: "warning"
    },
    users: {
        label: "Учасників",
        type: "success"
    },
    users_young: {
        label: "Наймолодший учасник",
        type: "success"
    },
    users_old: {
        label: "Найстарший учасник",
        type: "success"
    }
};

const GeneralRows = React.createClass({
    render() {
        const rows = this.props.data
            .map(g => {
                return (
                    <div>
                        {generalMap[g.name].label}
                        <Label bsStyle={generalMap[g.name].type} className="pull-right">
                            {g.l || moment(g.d).format('YYYY-MM-DD')}
                        </Label>
                    </div>
                );
            });
        return (
            <div>{rows}</div>
        );
    }
});

export const General = React.createClass({
    render() {
        return (
            <Loading loading={this.props.loading}>
                <GeneralRows data={_.get(this.props, 'data.data', [])}/>
            </Loading>
        );
    }
});

const LocationRows = React.createClass({
    render() {
        const rows = this.props.data.map(c =>
            <tr>
                <td>{c.location}</td>
                <td><span className="pull-right">{c.competition_count}</span></td>
            </tr>
        );
        return (
            <tbody>
                {rows}
            </tbody>
        );
    }
});

export const CompetitionsLocation = React.createClass({
    render() {
        return (
            <Loading loading={this.props.loading}>
                <table className="table table-striped">
                    <LocationRows data={_.get(this.props, 'data.data', [])}/>
                </table>
            </Loading>
        );
    }
});
