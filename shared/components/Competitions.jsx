import React from 'react';
import moment from 'moment';
import _ from 'lodash';
import Loading from './Loader.jsx';
import {Nav, NavItem, Input, Glyphicon, Col, Row} from 'react-bootstrap';

const NavBox = React.createClass({
    handleSelect(selectedKey) {
      this.props.onToggleNav(selectedKey);
    },
    render() {
      return (
        <Nav bsStyle="pills" activeKey={1} onSelect={this.handleSelect}>
          <NavItem eventKey={1} href="#all">Всі події</NavItem>
          <NavItem eventKey={2} href="#future" disabled>Майбутні</NavItem>
          <NavItem eventKey={3} href="#past" disabled>Минулі</NavItem>
        </Nav>
      )
    }
});  

const Toolbar = React.createClass({
    handleNav(tab) {
        this.setState({
            tab: 'tab'
        });
    },
    handleChange() {
        this.props.onUserInput({
            title: this.refs.title.getValue()
        });
    },
    render() {  
        return (
            <Col lg={4}>
                <NavBox tab='tab' onToggleNav={this.handleNav}/>
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
            </Col>
        );
    }
});

export default React.createClass({
    getInitialState() {
        return {
          loading: false,  
          filter: {
            title: ''
          },
          tab: 1
        }
    },
    handleUserInput(filter) {
        this.setState({
            filter: filter
        });
    },
    rendered() {
        this.setState({loading: false});
    },
    render() {  
        return (
            <Row>
                <Loading loading={this.props.loading || this.state.loading}>
                    <CompetitionRows 
                        data={_.get(this.props, 'data.data', [])}
                        filter={this.state.filter}
                        onRendered={this.rendered}/>
                    <Toolbar 
                        onUserInput={this.handleUserInput}
                        filter={this.state.filter}/> 
                </Loading> 
            </Row>
        );
    }
});

var CompetitionRows = React.createClass({
    render() {
        var competitionsRows = this.props.data
        .filter((competition) => {
            const t = new RegExp('.*' + this.props.filter.title.toLowerCase() + '.*', 'ig');
            const title = t.test(competition.title);
            return title;
        })
        .map((competition)=> {
            const classString = 'compettition-type compettition-type-' + competition.type_id;
            const link = 'competitions/'+competition.id;
            const logo = competition.logo || 'default.png';
            const url = competition.url ?
                <div>
                    <Glyphicon style={{width: '40px'}} glyph="link"/>
                    <a target="_blank" itemProp="url" href={competition.url}>{competition.url}</a><br/>
                </div>
                : null;
            return (
                <div key={competition.id} className="row" itemType="http://schema.org/SportsEvent">
                    <div className="event-logo col-lg-3">
                        <img className="img-thumbnail" src={'/img/events-logo/' + logo}/>
                    </div>
                    <div className="event-info col-lg-9">
                        <h3><a href={link}><span itemProp="name">{competition.title}</span></a></h3>
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
                    </div>
                    <div className='clearfix'></div>
                </div>
            );
        });
        return (
            <Col lg={8}>
                {competitionsRows}
            </Col>
        );
    }
});

var CompetitionCategories = React.createClass({
    render: function() {
        const categories = this.props.data.length > 0 ?
            _(this.props.data).map((c, i) =>
                <span key={c.id}>
                    <a href={`competitions/${c.id_competition}/categories/${c.id}`}>{c.title}</a>
                    {i < this.props.data.length ? ', ' : null}
                </span>
            )
            .value()
            : <em>немає категорій</em>;
        return <span>Категорії: {categories}</span>;
    }
});
