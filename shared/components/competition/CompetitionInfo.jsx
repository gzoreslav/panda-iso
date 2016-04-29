import React from 'react';
import moment from 'moment';
import _ from 'lodash';
import {Glyphicon, ListGroup, ListGroupItem, Thumbnail, Table, Button, Row, Col} from 'react-bootstrap';
import config from '../../../config/default.js';
import Breadcrumbs from '../breadcrumbs.jsx';
import Loading from './../Loader.jsx';
import DocumentTitle from 'react-document-title';
import pagination from '../../mixins/pagination';
import constants from '../../constants';
import TablePaginations from '../paginations.jsx';
import Map from '../map.jsx';

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
        const map = _.get(this.state, 'data.data.location') ?
            <Map location={this.state.data.data.location}/>
            : null;
        return (
            <DocumentTitle title={`PandaRUN - ${_.get(this.state, 'data.data.title', 'Завантаження змагання ...')}`}>
                <div className="container page-wrapper" itemScope itemType="http://schema.org/SportsEvent">
                    <Breadcrumbs
                        crumbs={[
                            {link: '/', label: 'Головна'},
                            {link: '/competitions', label: 'Календар'},
                            {label: _.get(this.state, 'data.data.title')}
                    ]}/>
                    <h4 itemProp="name" className="title text-danger">{_.get(this.state, 'data.data.title')}</h4>
                    <hr className="colorgraph"/>
                    <Row>
                        <Col sm={4}>
                            <Loading loading={this.state.loading || this.props.loading}>
                                <Info data={_.get(this.state, 'data.data', {})}/>
                            </Loading>
                        </Col>
                        <Col sm={8}>
                            <Loading loading={this.state.loading || this.props.loading}>
                                <CategoryList data={_.get(this.state, 'data.data', {})}/>
                            </Loading>
                            {map}
                        </Col>
                    </Row>
                </div>
            </DocumentTitle>
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
           <ListGroupItem key="title">
               {this.props.data.type_title}
           </ListGroupItem>
       );
       if (this.props.data.url) {
           items.push(
               <ListGroupItem key="url">
                   <Glyphicon style={{width: '40px'}} glyph="link"/>
                   <a target="_blank" itemProp="url" href={this.props.data.url}>{this.props.data.url}</a>
               </ListGroupItem>
           );
       }
       items.push(
           <ListGroupItem key="start_date">
               <Glyphicon style={{width: '40px'}} glyph="calendar"/>
               {moment(this.props.data.start_date).format('YYYY-MM-DD')}
           </ListGroupItem>
       );
       items.push(
           <ListGroupItem key="location">
               <Glyphicon style={{width: '40px'}} glyph="map-marker"/>
               {this.props.data.location}
           </ListGroupItem>
       );

       if (this.props.data.descr) {
           items.push(<ListGroupItem key="descr">{this.props.data.descr}</ListGroupItem>);
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
    getInitialState() {
        return {
            activePage: 1
        }
    },
    onPageChange(e, event) {
        this.setState({
            activePage: event.eventKey
        });
    },
    render() {
        const laps = this.props.data.showLaps ? (<th>Кількість кіл</th>) : null;
        const register = moment().diff(this.props.data.start_date, 'days') < 0 ? <th>Реєстрація</th> : null;
        return (
            <div>
                <Table responsive condensed striped>
                    <thead>
                        <tr>
                            <th className="column-name">Категорія</th>
                            <th>Загальна довжина дистації, км</th>
                            {laps}
                            <th>Кількість учасників</th>
                            {register}
                        </tr>
                    </thead>
                    <Categories
                        data={this.props.data}
                        activePage={this.state.activePage}
                        itemsPerPage={constants.itemsPerPage.small}
                    />
                </Table>
                <TablePaginations
                    activePage={this.state.activePage}
                    itemsPerPage={constants.itemsPerPage.small}
                    data={_.get(this.props, 'data.categories', [])}
                    onPageChange={this.onPageChange}
                />
            </div>
        );
    }
});

var Categories = React.createClass({
    mixins: [pagination],
    render: function() {
        var rows = this.props.data.categories && (this.props.data.categories.length > 0) ?
            this.props.data.categories
                .map((category, i) => {
                    const link = `/competitions/${category.id_competition}/categories/${category.id}`;
                    const lap = this.props.data.showLaps ? (<td>{category.laps}</td>) : null;
                    const register = moment().diff(this.props.data.start_date, 'days') < 0 ?
                        <td>
                            <Button bsSize="xsmall" bsStyle="success" disabled className="pull-right">
                                Зареєструватись
                            </Button>
                        </td>
                        : null;
                    return (
                        this.checkPage(i) ?
                            <tr key={category.id}>
                                <td>
                                    <a href={link}>{category.title}</a>
                                </td>
                                <td>
                                    <span className="pull-right">{category.dist.toFixed(4)}</span>
                                </td>
                                {lap}
                                <td>
                                    <span className="pull-right">{category.competitors}</span>
                                </td>
                                {register}
                            </tr>
                            : null
                    );
                })
                : <tr key="nodata"><td colSpan="3">немає категорій</td></tr>;
        return (
            <tbody>
                {rows}
            </tbody>
        );
    }
});
