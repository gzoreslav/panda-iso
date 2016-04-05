import React from 'react';
import _ from 'lodash';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import {Button, Modal, Input} from 'react-bootstrap';
import Loading from '../Loader.jsx';
import DateTimeField from 'react-bootstrap-datetimepicker';
import moment from 'moment';


export default React.createClass({
    propTypes: {
        onSave: React.PropTypes.func.isRequired,
        onClose: React.PropTypes.func.isRequired,
        showModal: React.PropTypes.bool,
        loading: React.PropTypes.bool
    },
    mixins: [LinkedStateMixin],
    getInitialState() {
        return {
            id: '',
            sex: '',
            firstname: '',
            lastname: '',
            nickname: '',
            birthday: '',
            location: '',
            team: ''
        };
    },
    componentWillReceiveProps(newProps) {
        this.setState(newProps);
    },
    validate() {
        return {
            firstname: this.state.firstname.length >= 3 ? null : 'error',
            lastname: this.state.lastname.length >= 3 ? null : 'error',
            birthday: this.state.birthday ? null : 'error',
            sex: this.state.sex !== '' ? null : 'error'
        }
    },
    save() {
        const valid = _(this.validate())
            .filter(val => val)
            .value().length === 0;
        if (valid) {
            this.props.onSave(this.state);
        }
    },
    birthdayChange(birthday) {
        console.log(birthday);
        this.setState({
            birthday: birthday !== 'Invalid date' ? moment(birthday, 'x').format('YYYY-MM-DD') : ''
        });
    },
    render() {
        const birth = moment(this.state.birthday).format('x');
        return (
                <Modal show={this.props.showModal} onHide={this.props.onClose}>
                    <Modal.Header>
                        <Modal.Title>Редагувати профайл</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Loading loading={this.props.loading}>
                            <form className="form-horizontal">
                                <Input
                                    labelClassName="col-xs-3"
                                    wrapperClassName="col-xs-9"
                                    type="text"
                                    placeholder="Введіть ваше ім'я"
                                    help="Мінімум 3 символи"
                                    label="Ім'я *"
                                    valueLink={this.linkState('firstname')}
                                    bsStyle={this.validate().firstname}
                                />
                                <Input
                                    labelClassName="col-xs-3"
                                    wrapperClassName="col-xs-9"
                                    type="text"
                                    placeholder="Введіть ваше прізвище"
                                    help="Мінімум 3 символи"
                                    label="Прізвище *"
                                    valueLink={this.linkState('lastname')}
                                    bsStyle={this.validate().lastname}
                                />
                                <Input
                                    labelClassName="col-xs-3"
                                    wrapperClassName="col-xs-9"
                                    type="select"
                                    placeholder="Виберіть стать"
                                    label="Стать *"
                                    valueLink={this.linkState('sex')}
                                    bsStyle={this.validate().sex}
                                >
                                    <option value="m">чоловіча</option>
                                    <option value="f">жіноча</option>
                                </Input>
                                <Input
                                    labelClassName="col-xs-3"
                                    wrapperClassName="col-xs-9"
                                    label="Дата народження *"
                                    help="Введіть дату в форматі дд/мм/рррр або скористайтесь віджетом"
                                    bsStyle={this.validate().birthday}
                                >
                                    <DateTimeField
                                        placeholder="дд/мм/рррр"
                                        mode="date"
                                        inputFormat="DD/MM/YYYY"
                                        onChange={this.birthdayChange}
                                        dateTime2={birth !== 'Invalid date' ? birth : undefined}
                                        defaultText={birth !== 'Invalid date' ? moment(this.state.birthday).format('DD/MM/YYYY') : ''}
                                    />
                                </Input>
                                <Input
                                    labelClassName="col-xs-3"
                                    wrapperClassName="col-xs-9"
                                    type="text"
                                    placeholder="Введіть ваш нікнейм"
                                    label="Нікнейм"
                                    valueLink={this.linkState('nickname')}
                                />
                                <Input
                                    labelClassName="col-xs-3"
                                    wrapperClassName="col-xs-9"
                                    type="text"
                                    placeholder="Введіть ваш клуб"
                                    label="Клуб"
                                    valueLink={this.linkState('team')}
                                />
                                <Input
                                    labelClassName="col-xs-3"
                                    wrapperClassName="col-xs-9"
                                    type="text"
                                    placeholder="Введіть вашу локацію"
                                    label="Локація"
                                    valueLink={this.linkState('location')}
                                />
                            </form>
                        </Loading>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            type="submit"
                            bsStyle="primary"
                            disabled={this.props.loading}
                            onClick={!this.props.loading ? this.save : null}
                        >
                            {this.props.loading ? 'Зберігаю...' : 'Зберегти'}
                        </Button>
                        <Button onClick={this.props.onClose}>Закрити</Button>
                    </Modal.Footer>
                </Modal>
        );
    }
});

