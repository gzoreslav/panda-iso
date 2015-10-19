import React from 'react';
import moment from 'moment';
import config from '../../../config/default.js';

const Competition = React.createClass({
    getInitialState() {
        return {title: 'not found'};
    },
    componentWillMount() {
        this.setState(this.props.resp);
    },
    render() {
        return (
            <div className="container page-wrapper">
                <ol className="breadcrumb">
                    <li><a href={config.host}>Головна</a></li>
                    <li><a href={config.host + "/competitions"}>Змагання</a></li>
                    <li className="active">{this.state.data.title}</li>
                </ol>
                <h4 className="title text-danger">{this.state.data.title}</h4>
                <hr className="colorgraph"/>
                <div className="row">
                    <div className="col-sm-4">
                        <Info data={this.state.data}/>
                    </div>
                    <div className="col-sm-8">
                        <CategoryList data={this.state.data.categories} showLaps={(this.state.data.show_laps !== 0)}/>
                    </div>
                </div>
            </div>
        );
    }
});

const Info = React.createClass({
   render() {
       const classString = 'compettition-type compettition-type-' + this.props.data.competition_type;
       return (
           <div>
               <img src={'/img/events-logo/' + this.props.data.logo}/><br/>
               <table className="table table-striped table-bordered">
               <tbody>
                   <tr>
                       <td>Офіційний сайт</td>
                       <td><a target="_blank" href={this.props.data.url}>{this.props.data.url}</a></td>
                   </tr>
                   <tr>
                       <td>Тип</td>
                       <td>{this.props.data.type_title}</td>
                   </tr>
                   <tr>
                       <td>Дата</td>
                       <td>{moment(this.props.data.start_date).format('DD/MM/YY')}</td>
                   </tr>
                   <tr>
                       <td>Локація</td>
                       <td>{this.props.data.location}</td>
                   </tr>
               </tbody>
               </table>
               <table className="table table-bordered">
                   <tbody><tr><td>{this.props.data.descr}</td></tr></tbody>
               </table>
           </div>
       );
   }
});

const CategoryList = React.createClass({
    render() {
        const laps = this.props.showLaps ? (<th>Кількість кіл</th>) : null;
        return (
            <div>
                <h5>Категорії</h5>
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th className="column-name">Назва</th>
                            <th>Загальна довжина дистації, км</th>
                            {laps}
                            <th>Кількість учасників</th>
                        </tr>
                    </thead>
                    <Categories data={this.props.data} showLaps={this.props.showLaps}/>
                </table>
            </div>
        );
    }
});

var Categories = React.createClass({
    render: function() {
        var rows = this.props.data.map((category) => {
            const link = '/competitions/'+category.id_competition + '/category/' + category.id;
            const lap = this.props.showLaps ? (<td>{category.laps}</td>) : null;
            return (
                <tr>
                    <td>
                        <a href={link}>{category.title}</a>
                    </td>
                    <td>
                        <span className="pull-right">{category.dist.toFixed(2)}</span>
                    </td>
                    {lap}
                    <td>
                        <span className="pull-right">{category.competitors}</span>
                    </td>
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


export default Competition;