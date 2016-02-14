import React from 'react';
import moment from 'moment';
import Loading from './Loader.jsx';
import {Nav, NavItem, Input} from 'react-bootstrap';

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
            <div className="col-lg-4">
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
            </div>  
        );
    }
});

const Competitions = React.createClass({
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
            <div className="row">
                <Loading loading={this.props.loading || this.state.loading}>
                    <CompetitionRows 
                        data={this.props.data.data}
                        filter={this.state.filter}
                        onRendered={this.rendered}/>
                    <Toolbar 
                        onUserInput={this.handleUserInput}
                        filter={this.state.filter}/> 
                </Loading> 
            </div>
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
            return (
                <div className="row" itemType="http://schema.org/SportsEvent">
                    <div className="event-logo col-lg-3">
                        <img src={'/img/events-logo/' + logo}/>
                    </div>
                    <div className="event-info col-lg-9">
                        <h3><a href={link}><span itemProp="name">{competition.title}</span></a></h3>
                        <h5>{competition.type_title}</h5>
                        <meta itemProp="startDate" content={moment(competition.start_date).format('YYYY-MM-DD')}/>
                        <span className="fa fa-calendar"/> <span>{moment(competition.start_date).format('DD/MM/YY')}</span><br/>
                        <div itemProp="location" itemScope itemType="http://schema.org/Place">
                            <span itemProp="address" itemScope itemType="http://schema.org/PostalAddress">
                                <span className="fa fa-map-marker"/> <span itemProp="addressLocality">{competition.location}</span>
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
            <div className="col-lg-8">
                {competitionsRows}
            </div>
        );
    }
});

var CompetitionCategories = React.createClass({
    render: function() {
        let categories = (<em>немає категорій</em>);
        if (this.props.data.length > 0) {
            categories = [];
            for (var i = 0; i < this.props.data.length; i++) {
                const link = 'competitions/' +  this.props.data[i].id_competition + '/category/' + this.props.data[i].id;
                let divider = ', ';
                if (i === (this.props.data.length - 1)) {
                    divider = '';
                }
                categories.push(<em><a href={link}>{this.props.data[i].title}</a>{divider}</em>);
            }
        }
        return (
            <span>
                Категорії: {categories}
            </span>
        );
    }
});


export default Competitions;
