import React from 'react';
import _ from 'lodash';
import {Button, ListGroup, ListGroupItem} from 'react-bootstrap';
import Loading from './Loader.jsx';
import ProfileForm from './profile/ProfileForm.jsx';
import Breadcrumbs from './breadcrumbs.jsx';
import {dateFormatter, sexFormatter, roleFormatter} from '../mixins/formatter';
import Auth from '../mixins/auth';
import fluxActions from '../mixins/fluxActions';
import {IconLabel} from './ui.jsx';


export default React.createClass({
    mixins: [
        dateFormatter,
        sexFormatter,
        roleFormatter,
        Auth,
        fluxActions
    ],
    getInitialState() {
        return {
        	loading: true,
        	data: {},
            showModal: false
        };
    },
    componentWillReceiveProps(nextProps) {
        this.setState(nextProps);
    },
    close() {
        this.setState({ showModal: false });
        this.actions.messages.hide();
    },
    showDialog() {
        this.setState({ showModal: true });
    },
    save(data) {
        this.actions.profile.edit(this.props.flux, data, this.auth.token);
    },
    render() {
        const edit = (this.auth.logged && (this.auth.id == this.state.data.id))
            ? <Button bsStyle="success" style={{float: 'right'}} onClick={this.showDialog}>Редагувати</Button>
            : null;

        const team = this.state.data.team
            ? <ListGroupItem><IconLabel width={80} label="команда" value={this.state.data.team}/></ListGroupItem>
            : null;
        const location = this.state.data.location ?
            <ListGroupItem><IconLabel width={80} glyph="map-marker" value={this.state.data.location}/></ListGroupItem>
            : null;
        const birthday = this.state.data.birthday ?
            <ListGroupItem>
                <IconLabel width={80} glyph="calendar" value={this.formatters.birthday(this.state.data.birthday)}/>
            </ListGroupItem>
            : null;

        return (
            <div className="container page-wrapper">
                <Breadcrumbs
                    crumbs={[
                            {link: '/', label: 'Головна'},
                            {link: '/profiles', label: 'Учасники'},
                            {label: this.state.data.firstname}
                    ]}/>
                <h4 className="title text-danger">{this.state.data.firstname}</h4>
                <hr className="colorgraph"/>
                <Loading loading={this.state.loading}>
                    <div className="row">
                        <div className="col-xs-3">
                            <img className="img-circle" src={`//graph.facebook.com/${this.state.data.fb_id}/picture?type=large`}/>
                        </div>
                        <div className="col-xs-9">
                            <ListGroup>
                                <ListGroupItem>
                                    {edit}
                                    <h4>{this.state.data.firstname} {this.state.data.lastname}</h4>
                                    <span style={{fontWeight: 'bold', color: '#999', marginBottom: '10px', display: 'block'}}>
                                        {this.state.data.nickname}
                                    </span>
                                    {this.formatters.role(this.state.data.role)}
                                </ListGroupItem>
                                <ListGroupItem>
                                    <IconLabel width={80} label="стать" value={this.formatters.sex(this.state.data.sex)}/>
                                </ListGroupItem>
                                {team}
                                {location}
                                {birthday}
                            </ListGroup>
                        </div>
                        <ProfileForm
                            loading={this.props.loading}
                            showModal={this.state.showModal}
                            onClose={this.close}
                            onSave={this.save}
                            {...this.state.data}
                        />
                    </div>
                </Loading>
            </div>
        );
    }
});
