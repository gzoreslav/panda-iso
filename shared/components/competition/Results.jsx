import React from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import config from '../../../config/default.js';
import {Input, Button, Col, Row, Table, Alert, ButtonToolbar, ButtonGroup, Glyphicon} from 'react-bootstrap';
import Sharer from '../Sharer.jsx';
import Loading from '../Loader.jsx';
import {naFormatter, dateFormatter, sexFormatter} from '../../mixins/formatter';
import auth from '../../mixins/auth';

export default React.createClass({
    getInitialState() {
        return {
            loading: true,
            data: {},
            showDetails: false
        };
    },
    componentWillReceiveProps(nextProps) {
        this.setState(nextProps);
    },
    toggleDetails() {
        this.setState({showDetails: !this.state.showDetails});
    },
    render() {
        const laps = this.state.showDetails ?
            _(_.get(this.props, 'parentData.laps.data', []))
                .map((lap, i) =>
                    <th>
                        {(this.props.parentData.show_laps !== 0) ? (<span>коло {i+1}<br/></span>) : null}
                        {lap.distance.toFixed(2)}км
                    </th>
                )
                .value()
            : null;
        const table = ((_.get(this.props, 'data.data', []).length === 0)  && (!this.state.loading || this.props.loading))
            ? <Alert bsStyle="info" style={{marginTop: '20px'}}>
                <Glyphicon glyph="info-sign"/> Результати ще не внесені
            </Alert>
            : <Table responsive condensed striped>
                <thead>
                <tr>
                    <th>Місце</th>
                    <th>Стартовий номер</th>
                    <th>Учасник</th>
                    <th>Стать</th>
                    {laps}
                    <th>Результат</th>
                </tr>
                </thead>
                <ResultRows
                    showDetails={this.state.showDetails}
                    info={this.props.parentData}
                    data={this.props.data.data}/>
            </Table>;
        return (
            <Loading loading={this.state.loading || this.props.loading}>
                <Toolbar
                    showDetails={this.state.showDetails}
                    toggle={this.toggleDetails}
                />
                {table}
            </Loading>
        );
    }
});

const Toolbar = React.createClass({
    render() {
        return (
            <Row style={{marginTop: '16px'}}>
                <Col lg={12}>
                    <ButtonToolbar className="pull-right">
                        <ButtonGroup bsSize="small">
                            <Button active={!this.props.showDetails} onClick={this.props.toggle}>Зведено</Button>
                            <Button active={this.props.showDetails} onClick={this.props.toggle}>Детально</Button>
                        </ButtonGroup>
                    </ButtonToolbar>
                </Col>
            </Row>
        );
    }
});

const ResultRows = React.createClass({
    mixins: [
        naFormatter,
        dateFormatter,
        sexFormatter,
        auth
    ],
    render: function() {
        const rows = this.props.data
            .map(result => {
                const valuesByLaps = this.props.showDetails ?
                    result.laps.map(lap =>
                        <td>
                            <span className="val">{this.formatters.na(lap.time)}</span>
                            <CellStat data={lap} laps={result.laps.length}/>
                        </td>
                    )
                    : null;
                return (
                    <tr className={classNames({me: result.id_user == this.auth.id})}>
                        <td><span className="pull-right">{result.rank}</span></td>
                        <td><span className="pull-right">{result.number}</span></td>
                        <td>
                            <span itemProp="performers" itemScope itemType="http://schema.org/Person">
                                <a href="#"><span itemProp="name">{result.firstname + ' ' + result.lastname}</span></a>
                                {/*<Sharer
                                    info={this.props.info}
                                    result={result}/>*/}
                            </span>
                        </td>
                        <td>{this.formatters.sex(result.sex)}</td>
                        {valuesByLaps}
                        <td className="mark">
                            {result.fall
                                ? <span className="fall">зійшов з дистанції</span>
                                : <span className="val">{this.formatters.na(result.total.time)}</span>}
                            {!this.props.showDetails && !result.fall ? <LapDiff data={result.total}/> : null}
                            {this.props.showDetails ? <CellSummary data={result.total}/> : null}
                        </td>
                    </tr>
                );
            });
        return (
            <tbody>{rows}</tbody>
        );
    }
});

const LapDiff = React.createClass({
    pluralize(num) {
        const last = (num + '')[(num + '').length - 1];
        if (last == 1) {
            return 'коло';
        } else if ((last >= 2) && (last <= 4)) {
            return 'кола';
        } else {
            return 'кіл';
        }
    },
    render() {
        return (this.props.data.time !== 'n/a') && (_.get(this.props.data, 'lap', 0) > 0) ?
            <div className="diff">
                <small>+{this.props.data.lap} {this.pluralize(this.props.data.lap)}</small>
            </div>
            : null;
    }
});

const CellSummary = React.createClass({
    render() {
        const prev = this.props.data.position > 2 ? _.get(this.props.data, 'dif.prev', 'n/a') : null;
        const winner = this.props.data.position > 1 ? _.get(this.props.data, 'dif.winner', 'n/a') : null;
        const diff = winner && (winner !== 'n/a') ?
            <div className="diff">
                {prev && (prev !== 'n/a') ? (<div><small>+{prev}</small><br/></div>) : null}
                <small>+{winner}</small>
            </div>
            : null;
        return this.props.data.time !== 'n/a' ?
            <div className="cell-values total">
                <small>шв-сть: {this.props.data.speed}</small><br/>
                <small>темп: {this.props.data.pace}</small>
                {diff}
                <LapDiff data={this.props.data}/>
            </div>
            : null;
    }
});

const CellStat = React.createClass({
    render() {
        const increase = _.get(this.props.data, 'increase', 0) !== 0
            ? this.props.data.increase
                ? <Glyphicon glyph="arrow-up"/>
                : <Glyphicon glyph="arrow-down"/>
            : <Glyphicon glyph="minus"/>;
      const currPos = (this.props.data.position === 'n/a') ? null :
      (
          <div className="cell-values positions">
            <small>позиція: {this.props.data.position}</small>{increase}
          </div>
      );
      const currSpeed = (this.props.data.speed === 'n/a') ? null :
      (
          <div className={classNames('cell-values', 'pace-speed', {
             highest: this.props.data.highest,
             lowest: this.props.data.lowest
          })}>
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
        return (this.props.laps > 1) ?
            <div>
                {currSpeed}
                {currPos}
                {extrem}
            </div>
        : null;
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
