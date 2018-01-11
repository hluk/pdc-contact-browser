'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var ReactBootstrap = require('react-bootstrap');
var Button = ReactBootstrap.Button;
var ButtonToolbar = ReactBootstrap.ButtonToolbar;
var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;
var classNames = require('classnames');
var Select = require('react-select');
var $ = require('jquery');

var common = require('./common.jsx');

// Prepends item to array only if it's not present yet.
function prependOption(array, value, label) {
  var item = {value: value, label: label};
  if ($.inArray(item, array) === -1) {
    array.unshift(item);
  }
}

module.exports = React.createClass({
  handleSubmit: function (e) {
    e.preventDefault();
    var data = {
      'component': ReactDOM.findDOMNode(this.refs.component).value.trim(),
      'role': $('input[name="query_role"]').val(),
      'contact': $('input[name="query_contact"]').val(),
    };
    this.props.onSubmit(data);
  },

  handleInputChange: function () {
    this.props.inputChange();
  },

  render: function () {
    var roleList = this.props.roles.map(function(role) {
      return { 'value': role, 'label': role };
    });
    prependOption(roleList, common.values.rolesAll, common.labels.rolesAll);

    // Sorted list of mailing-list and personal e-mails (duplicates removed).
    var contactList = (this.props.contacts.mail || [])
          .concat(this.props.contacts.people || [])
          .map(function(obj) { return obj.email; })
          .sort()
          .filter(function(contact, index, list) { return contact !== list[index + 1]; })
          .map(function(contact) { return { 'value': contact, 'label': contact }; });
    prependOption(contactList, common.values.contactsAll, common.labels.contactsAll);

    var component = (this.props.params['component']) ? this.props.params['component']:"";
    $("#component").attr("value", component);

    var initRole = (this.props.params['role'])
          ? this.props.params['role']
          : common.values.rolesAll;

    var initContact = (this.props.params['email'])
          ? this.props.params['email']
          : common.values.contactsAll;

    var role_spinning =  this.props.role_spinning;
    var contact_spinning =  this.props.contact_spinning;

    var roleSpinClass = classNames({
      'fa': true,
      'fa-refresh': true,
      'fa-spin': true,
      'loadingSpinner': true,
      'hidden': !role_spinning
    });
    var contactSpinClass = classNames({
      'fa': true,
      'fa-refresh': true,
      'fa-spin': true,
      'loadingSpinner': true,
      'hidden': !contact_spinning
    });
    return (
      <Row className="loadForm">
        <Col md={12}>
          <form className="form-horizontal" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="component" className="col-md-12">Component:</label>
              <div className="col-md-12">
                <input type="text" className="form-control" id="component" ref="component" onChange={this.handleInputChange}/>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="role" className="col-md-12">Contact Role:</label>
              <Col md={12}>
                <Select name="query_role" value={initRole} clearable={false} options={roleList}/>
                <i className={roleSpinClass}></i>
              </Col>
            </div>
            <div className="form-group">
              <label htmlFor="contact" className="col-md-12">Contact:</label>
              <Col md={12}>
                <Select name="query_contact" value={initContact} clearable={false} options={contactList}/>
                <i className={contactSpinClass}></i>
              </Col>
            </div>
            <div className="form-group">
              <Col md={12}>
                <Button type="submit" className="btn-primary" id="search-contacts">Search</Button>
              </Col>
            </div>
          </form>
        </Col>
      </Row>
    );
  }
});
