'use strict';

var React = require('react');
var NewPane = require('./NewPane.jsx');
import {Row, Col, Tab, Nav, NavItem, Glyphicon, Alert} from 'react-bootstrap';

module.exports = React.createClass({
  getInitialState: function() {
    return {
      'activeKey': '',
      'panelClass': '',
      'delMessageType': 'info',
      'delMessage': '',
      'enableDelBtn': true
    };
  },
  selectActionButton: function(eventKey) {
    this.setState({ 'activeKey': eventKey, 'panelClass': 'show-panel' });
  },
  hidePanel: function() {
    this.setState({ 'activeKey': '', 'panelClass': '' });
  },
  deleteContact: function() {
    var _this = this;
    if (!this.props.selectedContact.length) {
      this.setState({ 'delMessageType': 'danger', 'delMessage': 'Please select one contact firstly.' });
      return;
    } else {
      this.setState({ 'enableDelBtn': false });
    }
    $.ajax({
      url: this.props.selectedContact,
      method: 'DELETE',
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', 'Token ' + localStorage.getItem('token'));
      }
    })
    .done(function (response) {
      _this.props.onUpdate(_this.props.resource, _this.props.params);
      _this.props.clearSelectedContact();
      _this.setState({ 'delMessageType': 'success', 'delMessage': 'Record is deleted successfully on server.'});
    })
    .fail(function (response) {
      _this.props.onUpdate(_this.props.resource, _this.props.params);
      _this.setState({ 'delMessageType': 'danger', 'delMessage': response.responseText });
    })
    .always(function() {
      _this.setState({ 'enableDelBtn': true });
    });
  },
  render: function () {
    if (!this.props.showresult) {
      return <div />;
    }
    return (
      <Row>
        <Col md={12}>
          <Tab.Container id="table-toolbar" onSelect={this.selectActionButton} activeKey={this.state.activeKey}>
            <Col>
              <Nav bsStyle="pills" >
                <NavItem eventKey="new">
                  <Glyphicon glyph="plus" /> New
                </NavItem>
                <NavItem eventKey="delete" onClick={this.deleteContact} disabled={!this.state.enableDelBtn}>
                  <Glyphicon glyph="trash" /> Delete
                </NavItem>
              </Nav>
              <Tab.Content animation className={this.state.panelClass}>
                <Tab.Pane eventKey="new">
                  <NewPane releases={this.props.releases} roles={this.props.roles} 
                  contacts={this.props.contacts} resource={this.props.resource} 
                  params={this.props.params} onUpdate={this.props.onUpdate} hidePanel={this.hidePanel} />
                </Tab.Pane>
                <Tab.Pane eventKey="delete">
                  <Alert bsStyle={this.state.delMessageType}>
                    {this.state.delMessage}
                  </Alert>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Tab.Container>
        </Col>
      </Row>
    );
  }
});