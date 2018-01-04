'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var ReactBootstrap = require('react-bootstrap');
var Navbar = ReactBootstrap.Navbar;
var Row = ReactBootstrap.Row;

var HeaderLinks = require('./HeaderLinks.jsx');
var NetworkErrorDialog = require('./NetworkErrorDialog.jsx');
var NewContactDialog = require('./NewContactDialog.jsx');
var Footer = require('./Footer.jsx');

module.exports = React.createClass({
    getInitialState() {
        return {
            newContact: false,
        };
    },

    displayNewContactDialog(e) {
        e.preventDefault();
        this.setState({newContact: true});
    },

    hideNewContactDialog() {
        this.setState({newContact: false});
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
                    <li><a href="/">Contact Browser</a></li>
                    <li><a href="#" onClick={this.displayNewContactDialog}>Create new contact</a></li>
                </ul>
            </div>
          </nav>
          <div className="container-fluid wrapper">
            <Row className="layout">
              {this.props.children}
            </Row>
            <div className={this.props.overlayClass}></div>
            <NetworkErrorDialog ref='errorDialog' data={this.props.error} />
            <NewContactDialog show={this.state.newContact}
                onClose={this.hideNewContactDialog}
                onCreateNewContact={this.props.onCreateNewContact} />
          </div>
          <Footer />
        </div>
    }
});
