import React from 'react';
import moment from 'moment';
import config from '../../../config/default.js';
import {Input, Button, Nav, NavItem} from 'react-bootstrap';

const Category = React.createClass({
    getInitialState() {
        return {
          filter: {
            firstname: '',
            lastname: '',
            sex: 'all'
          },
          tab: 1
        }
    },
    componentWillMount() {
        this.setState({
          data: this.props.resp.data,
          results: this.props.results
        });
    },
    handleUserInput: function(filter) {
        this.setState({
            filter: filter
        });
    },
    handleNav: function(tab) {
        this.setState({
            tab: tab
        });
      },
    clearFilters() {
        this.setState({
            filter: {
            firstname: '',
            lastname: '',
            sex: 'all'
            }
        });
    },
    render() {
        return (
            <div className="container page-wrapper">
                <ol className="breadcrumb">
                    <li><a href={config.host}>Головна</a></li>
                    <li><a href={config.host + "/competitions"}>Змагання</a></li>
                    <li><a href={config.host + "/competitions/" + this.state.data.id_competition}>{this.state.data.competition_title}</a></li>
                    <li className="active">{this.state.data.title}</li>
                </ol>
                <Summary 
                  data={this.state.data}
                  results={this.state.results}/>
                <hr className="colorgraph"/>
                <FilterBox 
                  filter={this.state.filter}
                  onUserInput={this.handleUserInput} 
                  onClearFilters={this.clearFilters}/>
                <NavBox
                  tab={this.state.tab}
                  onToggleNav={this.handleNav}/>  
                <div className="row">
                    <div className="col-sm-12">
                        <ResultList 
                          data={this.state.data} 
                          results={this.state.results} 
                          filter={this.state.filter}
                          tab={this.state.tab}/>
                    </div>
                </div>
            </div>
        );
    }
});

const NavBox = React.createClass({
    handleSelect(selectedKey) {
      this.props.onToggleNav(selectedKey);
    },
    render() {
      return (
        <Nav bsStyle="tabs" activeKey={this.props.tab} onSelect={this.handleSelect}>
          <NavItem eventKey={1} href="#summary">Сумарно</NavItem>
          <NavItem eventKey={2} href="#details">Детально</NavItem>
          <NavItem eventKey={3} href="#graphs" disabled>Графіки</NavItem>
        </Nav>
      )
    }
});      

const ResultList = React.createClass({
    render() {
        let i = 0;
        const laps = this.props.data.laps.data.map((lap) => {
            i++;
            const lapName = (this.props.data.show_laps !== 0) ? (<span>коло {i}<br/></span>) : null;
            return (
              <th>{lapName}{lap.distance.toFixed(2)} км</th>
            );
        });
        return (
            <div>
                <h5>Результати</h5>
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Місце</th>
                            <th>Стартовий номер</th>
                            <th>Учасник</th>
                            <th>Стать</th>
                            {laps}
                        </tr>
                    </thead>
                    <ResultRows 
                      data={this.props.results.data}
                      filter={this.props.filter}
                      tab={this.props.tab}/>
                </table>
            </div>
        );
    }
});

const ResultRows = React.createClass({
    render: function() {
        var rows = this.props.data
          .filter((result) => {
            const f = new RegExp('.*' + this.props.filter.firstname.toLowerCase() + '.*', 'ig');
            const firstname = f.test(result.firstname);
            const l = new RegExp('.*' + this.props.filter.lastname.toLowerCase() + '.*', 'ig');
            const lastname = l.test(result.lastname);
            const sex = (this.props.filter.sex === 'all') ? true : (this.props.filter.sex === result.sex);
            return firstname && lastname && sex;
          })
          .map((result) => {
            let sex = '';
            if (result.sex === 'm') sex = 'чол.';
            if (result.sex === 'f') sex = 'жін.';
            let values = result.laps.map((lap) => {
              if (lap.time === 'n/a') {
                return (
                  <td><span className="n-a">N/A</span></td>
                );
              } else {
                if (this.props.tab === 2) {
                  return (
                    <td>
                      {lap.time}
                      <CellStat data={lap} laps={result.laps.length}/>
                    </td>
                  );
                } else {
                  return (
                    <td>
                      {lap.time}
                    </td>
                  );
                }  
              }
            });
            return (
                <tr>
                    <td>{result.rank}</td>
                    <td>{result.number}</td>
                    <td><a href="#">{result.firstname + ' ' + result.lastname}</a></td>
                    <td>{sex}</td>
                    {values}
                </tr>
            );
        });
        return (
            <tbody>{rows}</tbody>
        );
    }
});

const CellStat = React.createClass({
    render() {
      let increase = null;
      if (this.props.data.increase === true) {
        increase = (
          <span className="fa fa-arrow-up"/>
        );
      }  
      if (this.props.data.increase === false) {
        increase = (
          <span className="fa fa-arrow-down"/>
        );
      }  
      const total = (this.props.data.total === undefined) ? null :
      (
          <div className="cell-values total">
            <h5>Сумарно</h5>
            <small>шв-сть: {this.props.data.total.speed}</small><br/>
            <small>темп: {this.props.data.total.pace}</small>
          </div>
      );
      const currPos = (this.props.data.position === 'n/a') ? null :
      (
          <div className="cell-values positions">
            <small>позиція: {this.props.data.position}</small> {increase}
          </div>
      );
      const currSpeed = (this.props.data.speed === 'n/a') ? null :
      (
          <div className="cell-values pace-spped">
            <small>шв-сть: {this.props.data.speed}</small><br/>
            <small>темп: {this.props.data.pace}</small>
          </div>
      );
      let extrem = null;
      if (this.props.data.highest) {
        extrem = (
          <span className="rabbit"/>
        );
      }
      if (this.props.data.lowest) {
        extrem = (
          <span className="turtle"/>
        );
      }
      if (this.props.laps > 1) {
        return (
          <div>
            {currSpeed}
            {currPos}
            {extrem}
            {total}
          </div>
        );
      } else {
        return (
          <div>
            {total}
          </div>
        );
      }  
    }
});      

const SmallStat = React.createClass({
    render() {
        const male = this.props.results.data.filter((item) => item.sex === 'm').length;
        const female = this.props.results.data.filter((item) => item.sex === 'f').length;
        return (
          <table className="table table-striped table-bordered">
            <tbody>
              <tr>
                <td>Довжина дистанції:</td>
                <td>{this.props.data.dist.toFixed(2)}км</td>
              </tr>
              <tr>
                <td>Кількість учасників:</td>
                <td>{this.props.results.data.length}</td>
              </tr>
              <tr>
                <td>Чоловіків:</td>
                <td>{male}</td>
              </tr>
              <tr>
                <td>Жінок:</td>
                <td>{female}</td>
              </tr>
            </tbody>    
          </table>
        );    
    }
});

const FilterBox = React.createClass({
    handleChange() {
        this.props.onUserInput({
          firstname: this.refs.firstname.getValue(),
          lastname: this.refs.lastname.getValue(),
          sex: this.refs.sex.getValue()
        });
    },
    clearFilters() {
      this.props.onClearFilters()
    },
    render() {
        return (
                <div className="row">
                  <div className="col-sm-3">
                    <Input
                      autoFocus
                      ref="firstname" 
                      type="text" 
                      label="Ім'я" 
                      placeholder="Введіть ім'я учасника" 
                      value={this.props.filter.firstname}
                      onChange={this.handleChange}/>
                  </div>    
                  <div className="col-sm-3">
                    <Input
                      ref="lastname" 
                      type="text" 
                      label="Прізвище" 
                      placeholder="Введіть прізвище учасника" 
                      value={this.props.filter.lastname}
                      onChange={this.handleChange}/>
                  </div>  
                  <div className="col-sm-2">
                    <Input 
                      ref="sex"
                      type="select" 
                      label="Стать" 
                      placeholder="виберіть стать"
                      value={this.props.filter.sex}
                      onChange={this.handleChange}>
                        <option value="all">всі</option>
                        <option value="m">чоловіки</option>
                        <option value="f">жінки</option>
                        <option value="na">стать не зазначена</option>
                    </Input>
                  </div>
                  <div className="col-sm-4">  
                    <div className="pull-right">
                      <Button 
                        bsStyle="primary" 
                        bsSize="small"
                        onClick={this.clearFilters}>Скинути фільтри</Button>
                    </div>
                  </div>    
                </div>
        );
    }
});

const Summary = React.createClass({
  getInitialState() {
    return {show: false};
  },
  toggleDetails() {
    this.setState({show: !this.state.show});
  },
  render() {
    return this.state.show ? (
      <div className="row">
        <div className="col-sm-3">
          <img src={'/img/events-logo/' + this.props.data.logo}/>
        </div>  
        <div className="col-sm-6">
          <h3 className="title text-danger">{this.props.data.competition_title}</h3>
          <span className="title text-info"><strong>Категорія:</strong> {this.props.data.title}</span>
        </div>  
        <div className="col-sm-3">
          <SmallStat 
            data={this.props.data}
            results={this.props.results}/>
          <a href="#" onClick={this.toggleDetails} className="pull-right">сховати деталі <span className="fa fa-arrow-up"/></a>
        </div>
      </div>
      ) : (
      <div className="row">
        <div className="col-sm-11">
          <h4 className="title text-danger"><span className="fa fa-table"/> {this.props.data.competition_title} - {this.props.data.title} - [протокол змагань]</h4>
        </div>
        <div className="col-sm-1">
          <img src={'/img/events-logo/' + this.props.data.logo} style={{visibility: 'hidden', height: '1px', width: '1px'}}/>
          <a href="#" onClick={this.toggleDetails} className="pull-right">деталі <span className="fa fa-arrow-down"/></a>
        </div>  
      </div>  
      );
  }
});

export default Category;