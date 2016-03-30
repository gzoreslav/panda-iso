import React from 'react';
import moment from 'moment';
import _ from 'lodash';
import {Glyphicon, ListGroup, ListGroupItem, Thumbnail, Table} from 'react-bootstrap';
import config from '../../../config/default.js';
import Breadcrumbs from '../breadcrumbs.jsx';
import Loading from './../Loader.jsx';


export default React.createClass({
    getInitialState() {
        return {
            loading: true,
            data: {}
        };
    },
    componentWillReceiveProps(nextProps) {
        this.setState(nextProps);
    },
    render() {
        return (
            <div className="container page-wrapper" itemScope itemType="http://schema.org/SportsEvent">
                <Breadcrumbs
                    crumbs={[
                        {link: '/', label: 'Головна'},
                        {link: '/competitions', label: 'Календар'},
                        {label: _.get(this.state, 'data.data.title')}
                ]}/>
                <h4 itemProp="name" className="title text-danger">{_.get(this.state, 'data.data.title')}</h4>
                <hr className="colorgraph"/>
                <div className="row">
                    <div className="col-sm-4">
                        <Loading loading={this.state.loading || this.props.loading}>
                            <Info data={_.get(this.state, 'data.data', {})}/>
                        </Loading>
                    </div>
                    <div className="col-sm-8">
                        <Loading loading={this.state.loading || this.props.loading}>
                            <CategoryList data={_.get(this.state, 'data.data', {})}/>
                        </Loading>
                    </div>
                </div>
            </div>
        );
    }
});

const Info = React.createClass({
   render() {
       const img = this.props.data.logo
           ? <Thumbnail src={`/img/events-logo/${this.props.data.logo}`}/>
           : <Thumbnail src="/img/events-logo/default.png"/>;
       const items = [];
       items.push(
           <ListGroupItem>
               {this.props.data.type_title}
           </ListGroupItem>
       );
       if (this.props.data.url) {
           items.push(
               <ListGroupItem>
                   <Glyphicon style={{width: '40px'}} glyph="link"/>
                   <a target="_blank" itemProp="url" href={this.props.data.url}>{this.props.data.url}</a>
               </ListGroupItem>
           );
       }
       items.push(
           <ListGroupItem>
               <Glyphicon style={{width: '40px'}} glyph="calendar"/>
               {moment(this.props.data.start_date).format('YYYY-MM-DD')}
           </ListGroupItem>
       );
       items.push(
           <ListGroupItem>
               <Glyphicon style={{width: '40px'}} glyph="map-marker"/>
               {this.props.data.location}
           </ListGroupItem>
       );

       if (this.props.data.descr) {
           items.push(<ListGroupItem>{this.props.data.descr}</ListGroupItem>);
       }
       return (
           <div>
               {img}
               <ListGroup>{items}</ListGroup>
           </div>
       );
   }
});

const CategoryList = React.createClass({
    render() {
        const laps = this.props.data.showLaps ? (<th>Кількість кіл</th>) : null;
        return (
            <Table responsive condensed striped>
                <thead>
                    <tr>
                        <th className="column-name">Категорія</th>
                        <th>Загальна довжина дистації, км</th>
                        {laps}
                        <th>Кількість учасників</th>
                    </tr>
                </thead>
                <Categories data={this.props.data}/>
            </Table>
        );
    }
});

var Categories = React.createClass({
    render: function() {
        var rows = this.props.data.categories && (this.props.data.categories.length > 0) ?
            this.props.data.categories
                .map((category) => {
                const link = `/competitions/${category.id_competition}/categories/${category.id}`;
                const lap = this.props.data.showLaps ? (<td>{category.laps}</td>) : null;
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
            })
            : <tr><td colSpan="3">немає категорій</td></tr>;
        return (
            <tbody>
                {rows}
            </tbody>
        );
    }
});
