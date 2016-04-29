import React from 'react';
import moment from 'moment';
import _ from 'lodash';
import Loading from './Loader.jsx';
import {Nav, NavItem, Input, Glyphicon, Col, Row, Button} from 'react-bootstrap';
import constants from '../constants';
import TablePaginations from './paginations.jsx';
import pagination from '../mixins/pagination';


const NavBox = React.createClass({
    handleSelect(selectedKey) {
      this.props.onToggleNav(selectedKey);
    },
    render() {
      return (
        <Nav bsStyle="pills" activeKey={this.props.tab} onSelect={this.handleSelect}>
          <NavItem eventKey={1} href="#all">Всі події</NavItem>
          <NavItem eventKey={2} href="#future">Майбутні</NavItem>
          <NavItem eventKey={3} href="#past">Архів</NavItem>
        </Nav>
      )
    }
});  

const Toolbar = React.createClass({
    handleNav(tab) {
        this.setState({
            tab: tab
        }, () => this.handleChange() );
    },
    handleChange() {
        this.props.onUserInput({
            title: this.refs.title.getValue(),
            tab: this.state.tab
        });
    },
    render() {  
        return (
            <Col lg={4}>
                <div className="well">
                    <NavBox tab={this.props.filter.tab} onToggleNav={this.handleNav}/>
                    <br/>
                    <Input
                          autoFocus
                          ref="title"
                          type="text"
                          label="Назва події"
                          placeholder="Введіть назву події"
                          value={this.props.filter.title}
                          onChange={this.handleChange}/>
                    <Input type="checkbox" label="Тільки з результатами" checked />
                </div>
            </Col>
        );
    }
});

export default React.createClass({
    getInitialState() {
        return {
            loading: false,
            filter: {
                title: '',
                tab: 1
            },
            activePage: 1
        }
    },
    handleUserInput(filter) {
        this.setState({
            filter: filter,
            activePage: 1
        });
    },
    onPageChange(e, event) {
        this.setState({
            activePage: event.eventKey
        });
    },
    doFilter(c) {
        const titleFilter =
            new RegExp('.*' + this.state.filter.title.toLowerCase() + '.*', 'ig').test(c.title);
        const timeFilter = this.state.filter.tab === 1 ? true :
            this.state.filter.tab === 2 ? moment().diff(c.start_date, 'days') <= 0 :
                this.state.filter.tab === 3 ? moment().diff(c.start_date, 'days') > 0 : false;
        return titleFilter && timeFilter;
    },
    render() {  
        return (
            <Row>
                <Loading loading={this.props.loading || this.state.loading}>
                    <Col lg={8}>
                        <TablePaginations
                            activePage={this.state.activePage}
                            itemsPerPage={constants.itemsPerPage.small}
                            data={_.get(this.props, 'data.data', [])}
                            onPageChange={this.onPageChange}
                            filter={this.doFilter}
                        />
                        <CompetitionRows
                            data={_.get(this.props, 'data.data', [])}
                            activePage={this.state.activePage}
                            itemsPerPage={constants.itemsPerPage.small}
                            filter={this.doFilter}
                        />
                        <TablePaginations
                            activePage={this.state.activePage}
                            itemsPerPage={constants.itemsPerPage.small}
                            data={_.get(this.props, 'data.data', [])}
                            onPageChange={this.onPageChange}
                            filter={this.doFilter}
                        />
                    </Col>
                    <Toolbar 
                        onUserInput={this.handleUserInput}
                        filter={this.state.filter}/> 
                </Loading> 
            </Row>
        );
    }
});

var CompetitionRows = React.createClass({
    mixins: [pagination],
    render() {
        const rows = this.props.data
            .filter((competition) => {
                return this.props.filter(competition);
            })
            .map((competition, i)=> {
                const url = competition.url ?
                    <div>
                        <Glyphicon style={{width: '40px'}} glyph="link"/>
                        <a target="_blank" itemProp="url" href={competition.url}>{competition.url}</a><br/>
                    </div>
                    : null;
                return (
                    this.checkPage(i) ?
                        <Row key={competition.id} className="row" itemType="http://schema.org/SportsEvent">
                            <Col lg={3} className="event-logo">
                                <img className="img-thumbnail" src={`/img/events-logo/${competition.logo || 'default.png'}`}/>
                            </Col>
                            <Col lg={9} className="event-info">
                                <h3><a href={`competitions/${competition.id}`}><span itemProp="name">{competition.title}</span></a></h3>
                                <Row>
                                    <Col lg={10}>
                                        <h5>{competition.type_title}</h5>
                                        <meta itemProp="startDate" content={moment(competition.start_date).format('YYYY-MM-DD')}/>
                                        {url}
                                        <Glyphicon style={{width: '40px'}} glyph="calendar"/>{moment(competition.start_date).format('YYYY-MM-DD')}<br/>
                                        <div itemProp="location" itemScope itemType="http://schema.org/Place">
                                            <span itemProp="address" itemScope itemType="http://schema.org/PostalAddress">
                                                <Glyphicon style={{width: '40px'}} glyph="map-marker"/>
                                                <span itemProp="addressLocality">{competition.location}</span>
                                            </span>
                                        </div>
                                        <h5>Учасників: {competition.competitors.count}</h5>
                                        <CompetitionCategories data={competition.categories} />
                                    </Col>
                                    <Col lg={2}>
                                        <RegisterLink competition={competition}/>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    : null
                );
            });
        return <div>{rows}</div>;
    }
});

const RegisterLink = React.createClass({
    render() {
        const diff = moment().diff(this.props.competition.start_date, 'days');
        return (
            <div>
                {diff < 0 ?
                    <Button
                        href={`competitions/${this.props.competition.id}`}
                        bsSize="small"
                        bsStyle="success"
                        className="pull-right"
                    >
                        Зареєструватись
                    </Button>
                    : null
                }
            </div>
        );
    }
});

const CompetitionCategories = React.createClass({
    render() {
        const categories = this.props.data.length > 0 ?
            _(this.props.data).map((c, i) =>
                <span key={c.id}>
                    <a href={`competitions/${c.id_competition}/categories/${c.id}`}>{c.title}</a>
                    {i < this.props.data.length - 1 ? ', ' : null}
                </span>
            )
            .value()
            : <em>немає категорій</em>;
        return <span>Категорії: {categories}</span>;
    }
});
