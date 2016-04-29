import React from 'react';
import {RouteHandler} from 'react-router';
import moment from 'moment';
import _ from 'lodash';
import config from '../../../config/default.js';
import {Input, Button, Nav, NavItem, Row, Col, Glyphicon, Thumbnail} from 'react-bootstrap';
import Loading from '../Loader.jsx';
import Breadcrumbs from '../breadcrumbs.jsx';
import DocumentTitle from 'react-document-title';


export default React.createClass({
    componentWillReceiveProps(nextProps) {
        this.setState(nextProps);
    },
    render() {
        return (
            <DocumentTitle title={`PandaRUN - ${_.get(this.state, 'data.data.competition_title')} - ${_.get(this.state, 'data.data.title', 'Завантаження змагання ...')}`}>
                <div className="container page-wrapper" itemScope itemType="http://schema.org/SportsEvent">
                    <Breadcrumbs
                        crumbs={[
                            {link: '/', label: 'Головна'},
                            {link: '/competitions', label: 'Календар'},
                            {link: `/competitions/${_.get(this.state, 'data.data.id_competition')}`,
                                label: _.get(this.state, 'data.data.competition_title')},
                            {label: _.get(this.state, 'data.data.title')}
                    ]}/>
                    <Loading loading={this.props.loading}>
                        <Info data={_.get(this.state, 'data.data', {})}/>
                    </Loading>
                    <hr className="colorgraph"/>
                    <Tabs data={_.get(this.state, 'data.data', {})}/>
                    <RouteHandler
                        {...this.props}
                        data={_.get(this.state, 'data.data', {})}
                        key={this.props.pathname}/>
                </div>
            </DocumentTitle>
        );
    }
});

const Info = React.createClass({
    render() {
        const circles = this.props.data.show_laps ?
            <div>
                <Glyphicon style={{width: '40px'}} glyph="repeat"/>
                {this.props.data.laps ? this.props.data.laps.count : 'кількість кіл не вказана'}
            </div>
            : null;
        const img = this.props.data.logo
            ? <Thumbnail src={`/img/events-logo/${this.props.data.logo}`}/>
            : <Thumbnail src="/img/events-logo/default.png"/>;
        return (
            <div>
                <Row>
                    <Col lg={2}>
                        {img}
                    </Col>
                    <Col lg={8}>
                        <h4 className="title text-danger" itemProp="name">{this.props.data.competition_title}</h4>
                        <h5>Категорія: {this.props.data.title}</h5>
                    </Col>
                    <Col lg={2}>
                        <Glyphicon style={{width: '40px'}} glyph="calendar"/>
                        {moment(this.props.data.start_date).format('YYYY-MM-DD')}<br/>
                        <Glyphicon style={{width: '40px'}} glyph="map-marker"/>
                        {this.props.data.location}<br/>
                        <Glyphicon style={{width: '40px'}} glyph="resize-horizontal"/>
                        {this.props.data.dist ? `${this.props.data.dist.toFixed(4)}км` : 'дистанція не вказана'}<br/>
                        {circles}
                    </Col>
                </Row>
            </div>
        );
    }
});

const tabs = [{
    name: 'results',
    label: 'Результати'
}, {
    name: 'members',
    label: 'Учасники'
}, {
    name: 'catstatistic',
    label: 'Статистика'
}];

const Tabs = React.createClass({
    contextTypes: {
        router: React.PropTypes.func
    },
    render() {
        const routes = this.context.router.getCurrentRoutes();
        const link = `/competitions/${this.props.data.id_competition}/categories/${this.props.data.id}`;
        const items = _(tabs)
            .map((tab, i) =>
                <NavItem
                    key={tab.name}
                    eventKey={tab.name}
                    href={`${link}/${tab.name}`}
                    active={(routes[5] && routes[5].name) ? routes[5].name === tab.name : i === 0}
                >
                    {tab.label}
                </NavItem>
            )
            .value();
        return (
            <div>
                <Nav bsStyle="tabs" activeKey={this.props.tab} onSelect={this.handleSelect}>
                    {items}
                </Nav>
            </div>
        )
    }
});
