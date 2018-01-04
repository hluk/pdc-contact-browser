'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var ReactBootstrap = require('react-bootstrap');
var Modal = ReactBootstrap.Modal;
var Button = ReactBootstrap.Button;
var FormControl = ReactBootstrap.FormControl;
var FormGroup = ReactBootstrap.FormGroup;
var ControlLabel = ReactBootstrap.ControlLabel;
var $ = require('jquery');

var common = require('./common.jsx');

module.exports = React.createClass({
    getInitialState() {
        return {
            name: '',
            email: '',
            type: 'people',
            message: '',
            msg_type: ''
        };
    },

    setType(type) {
        this.setState({type: type});
    },

    setError(msg) {
        this.setState({message: msg, msg_type: 'Error'});
    },

    submit() {
        if (!this.state.name || !this.state.email) {
            this.setError('Both fields are required');
            return;
        }
        this.setState({message: 'Creating contact …', msg_type: 'Notice'});
        const name_key = this.state.type === 'people' ? 'username' : 'mail_name';
        const data = {
            [name_key]: this.state.name,
            email: this.state.email,
        };

        const url = localStorage['server'] + "contacts/" + this.state.type + "/";
        $.ajax({
            url: url,
            dataType: "json",
            contentType: 'application/json',
            method: "POST",
            data: JSON.stringify(data),
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Token ' + localStorage.getItem('token'));
            }
        }).done((response) => {
            // Display notice and reset form
            this.props.onCreateNewContact(this.state.type, response);
            this.setState({name: '', email: '', message: 'Contact created', msg_type: 'Notice'});
        }).fail((response) => {
            this.setError(response.responseText);
        });
    },

    handleChange(event) {
        this.setState({[event.target.id]: event.target.value});
    },

    close() {
        this.setState({message: ''});
        this.props.onClose();
    },

    render() {
        if (!this.props.show) {
            return <div />;
        }
        const activeCls = "btn btn-default active";
        const inactiveCls = "btn btn-default";
        const nameLabel = this.state.type === "people" ? "Username" : "Mailing list name";

        let err = null;
        if (this.state.message) {
            const cls = this.state.msg_type === 'Error' ? 'panel panel-danger' : 'panel panel-info';
            err = (<div className={cls}>
                <div className="panel-heading">{this.state.msg_type}</div>
                <div className="panel-body">{this.state.message}</div>
            </div>);
        }

        return (
            <Modal show={this.props.show} onHide={this.close} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Create new contact</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <div className="btn-group" data-toggle="buttons">
                        <label className={this.state.type === "people" ? activeCls : inactiveCls}>
                            <input type="radio" id="option1"
                                onChange={() => this.setType('people')} />
                            Person
                        </label>

                        <label className={this.state.type === "mailing-lists" ? activeCls : inactiveCls}>
                            <input type="radio" id="option2"
                                onChange={() => this.setType('mailing-lists')} />
                            Mailing List
                        </label>
                    </div>

                    <FormGroup bsSize='large'>
                        <ControlLabel>{nameLabel}</ControlLabel>
                        <FormControl id="name" type="text" value={this.state.name}
                            onChange={this.handleChange} />
                    </FormGroup>

                    <FormGroup bsSize='large'>
                        <ControlLabel>E-mail</ControlLabel>
                        <FormControl id="email" type="email" value={this.state.email}
                            onChange={this.handleChange} />
                    </FormGroup>

                    {err}

                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.submit} bsStyle="success">Save</Button>
                    <Button onClick={this.close}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
});
