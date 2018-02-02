'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var ReactBootstrap = require('react-bootstrap');
var Navbar = ReactBootstrap.Navbar;
var Row = ReactBootstrap.Row;

var HeaderLinks = require('./HeaderLinks.jsx');
var NetworkErrorDialog = require('./NetworkErrorDialog.jsx');
var NewContactDialog = require('./NewContactDialog.jsx');
var PermissionDialog = require('./PermissionDialog.jsx');
var Footer = require('./Footer.jsx');

const Modal = Object.freeze({
    NONE: 0,
    NEW_CONTACT: 1,
    PERMISSIONS: 2
});

module.exports = React.createClass({
    getInitialState() {
        return {
            modal: Modal.NONE,
        };
    },

    displayModal(e, m) {
        e.preventDefault();
        this.setState({modal: m});
    },

    hideModal() {
        this.setState({modal: Modal.NONE});
    },

    render() {
        return <div>
          {this.props.style}
          <nav className="navbar navbar-pf navbar-default">
            <Navbar.Header>
              <Navbar.Brand>
                {this.props.logo}
                Product Definition Center &mdash; Contact Browser
              </Navbar.Brand>
            </Navbar.Header>
            <div className="navbar-collapse collapse">
                <HeaderLinks links={this.props.links} />
                <ul className="nav navbar-nav navbar-primary">
                    <li><a href="#">Contact Browser</a></li>
                    <li><a href="#" onClick={e => this.displayModal(e, Modal.NEW_CONTACT)}>Create New Contact</a></li>
                    <li><a href="#" onClick={e => this.displayModal(e, Modal.PERMISSIONS)}>Permissions</a></li>
                </ul>
            </div>
          </nav>
          <div className="container-fluid wrapper">
            <Row className="layout">
              {this.props.children}
            </Row>
            <div className={this.props.overlayClass}></div>
            <NetworkErrorDialog ref='errorDialog' data={this.props.error} />
            <NewContactDialog show={this.state.modal === Modal.NEW_CONTACT}
                onClose={this.hideModal}
                onCreateNewContact={this.props.onCreateNewContact} />
            <PermissionDialog show={this.state.modal === Modal.PERMISSIONS}
                onClose={this.hideModal} />
          </div>
          <Footer />
        </div>
    }
});
