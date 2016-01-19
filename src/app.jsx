'use strict';

var PAGE_SIZE = 20;

var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var $ = require('jquery');

var Button = ReactBootstrap.Button;
var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;
var Pagination = ReactBootstrap.Pagination;
var Modal = ReactBootstrap.Modal;
var Setting = require('./serversetting.json');
var Url = Setting.server;

var ContactBrowserApp = React.createClass({
    getInitialState: function () {
        this.getToken(this.getInitialData);
        return {
            count: 0,
            data: [],
            url: Url,
            params: {},
            page: 1,
            busy: false,
            error: {},
            showresult: false,
            releases: [],
            contacts: [],
        };
    },
    getToken: function (getInitialData) {
        document.addEventListener("DOMContentLoaded", function () {
        var url = Url + 'auth/token/obtain/';
        var x = new XMLHttpRequest();
        x.open('GET', url, true);
        x.withCredentials = true;
        x.setRequestHeader('Accept', 'application/json');
        x.addEventListener("load", function () {
            var data = JSON.parse(x.response);
            getInitialData(data.token);
        });
        x.addEventListener("error", function () {
            document.write('Authorization Required');
        });
        x.send();
        });
    },
    getInitialData: function (token) {
        $.ajaxSetup({
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Token ' + token);
            }
        });
        var releases = ['all', 'global'];
        var contacts = ['all'];
        var param = {};
        param["page_size"] = -1;
        $.ajax({
            url: Url + "releases/",
            dataType: "json",
            data: param,
            method: "GET",
            success: function (response) {
                for (var idx in response) {
                    releases.push(response[idx].release_id)
               }
                this.setState({busy: false,
                              releases: releases});
           }.bind(this),
            error: function (xhr, status, err) {
                this.displayError(Url + "releases/", 'GET', xhr, status, err);
            }.bind(this)
        });
        $.ajax({
            url: Url + "contact-roles/",
            dataType: "json",
            data: param,
            method: "GET",
            success: function (response) {
                for (var idx in response) {
                    contacts.push(response[idx].name);
                }
                this.setState({busy: false,
                              contacts: contacts});
            }.bind(this),
            error: function (xhr, status, err) {
                this.displayError(Url + "contact-roles/", 'GET', xhr, status, err);
            }.bind(this)
        });
    },
    displayError: function (url, method, xhr, status, err) {
        console.log(url, status, err);
        this.setState({
            busy: false,
            error: {
                url: url,
                xhr: xhr,
                status: status,
                err: err,
                method: method
            }
        });
    },
    handleFormSubmit: function (data) {
        var params = {};
        var url = null;
        if (data['release'] == 'global') {
            url = this.state.url + 'global-component-contacts/';
        }
        else {
            url = this.state.url + 'release-component-contacts/';
            if(data['release'] != 'all') {
                params['release'] = data['release'];
            }
        }
        if (data['component']) {
            params['component'] = data['component'];
        }
        if (data['contact'] != 'all') {
            params['role'] = data['contact'];
        }
        this.setState({url: url, params: params, page: 1, showresult: true},
                      this.loadData);
    },
    loadData: function () {
        this.setState({busy: true});
        var data = JSON.parse(JSON.stringify(this.state.params));
        data["page"] = this.state.page;
        $.ajax({
            url: this.state.url,
            dataType: "json",
            data: data,
            success: function (response) {
                this.setState({busy: false,
                              data: response.results,
                              count: response.count,
                              next: response.next,
                              prev: response.prev});
            }.bind(this),
            error: function (xhr, status, err) {
                this.displayError(this.state.url, 'GET', xhr, status, err);
            }.bind(this)
        });
    },
    handlePageChange: function (p) {
        this.setState({page: p}, this.loadData);
    },
    handleInputChange: function () {
        this.setState({url: Url});
    },
    clearError: function () {
        this.setState({error: {}});
    },
    render: function () {
        return (
            <div className="container-fluid">
                <LoadForm releases={this.state.releases} contacts={this.state.contacts} onSubmit={this.handleFormSubmit} inputChange={this.handleInputChange}/>
                <Pager count={this.state.count} page={this.state.page} onPageChange={this.handlePageChange} />
                <Browser data={this.state.data}  showresult={this.state.showresult} />
                <Pager count={this.state.count} page={this.state.page} onPageChange={this.handlePageChange} />
                <Spinner enabled={this.state.busy} />
                <NetworkErrorDialog onClose={this.clearError} data={this.state.error} />
            </div>
        );
    }
});

var NetworkErrorDialog = React.createClass({
    handleClose: function () {
        this.props.onClose();
    },
    render: function () {
        if (Object.keys(this.props.data).length == 0) {
            return <div />;
        }
        var title = "Error: " + this.props.data.xhr.status + " " + this.props.data.err;
        var resp = <span />;
        if (this.props.data.xhr.responseJSON) {
            resp = (
                <div>
                    <p>The response was:</p>
                    <pre>{JSON.stringify(this.props.data.xhr.responseJSON, null, 2)}</pre>
                </div>
            );
        }
        return (
            <Modal
                title={title}
                className="error-dialog"
                onRequestHide={this.handleClose}>
                <div className="modal-body">
                    <p><b>{this.props.data.method}</b> <code>{this.props.data.url}</code></p>
                    {resp}
                </div>
                <div className='modal-footer'>
                    <Button onClick={this.handleClose}>Close</Button>
                </div>
            </Modal>
        );
    }
});

var Spinner = React.createClass({
    render: function () {
        if (this.props.enabled) {
            return (
                <div className='overlay'>
                    <div className='spinner-loader'>Loading …</div>
                </div>
            );
        } else {
            return (<div />);
        }
    }
});

var Pager = React.createClass({
    handlePageChange: function (event, selectedEvent) {
        event.preventDefault()
        this.props.onPageChange(selectedEvent.eventKey);
    },
    render: function () {
        if (this.props.count == 0) {
            return <div />;
        }
        var n_pages = Math.ceil(this.props.count / PAGE_SIZE);
        return (
            <Row>
                <Col md={6}>
                    <p className="count-text">{this.props.count} contacts</p>
                </Col>
                <Col md={6} className="text-right">
                    <Pagination
                        items={n_pages}
                        activePage={this.props.page}
                        onSelect={this.handlePageChange} />
                </Col>
            </Row>
        );
    }
});

var LoadForm = React.createClass({
    handleSubmit: function (e) {
        e.preventDefault();
        var data = {
            'component': React.findDOMNode(this.refs.component).value.trim(),
            'release': React.findDOMNode(this.refs.release).value,
            'contact': React.findDOMNode(this.refs.contact).value
        };
        this.props.onSubmit(data);
    },
    handleInputChange: function () {
        this.props.inputChange();
    },
    render: function () {
        var releases = this.props.releases.map(function (val) {
            return <option key={val}>{val}</option>;
        });
        var contacts = this.props.contacts.map(function (val) {
            return <option key={val}>{val}</option>;
        });
        return (
            <Row className="loadForm">
                <Col md={10} mdOffset={1}>
                    <h2 className="text-center">Contact Browser</h2>
                    <form className="form-horizontal" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="component" className="col-sm-4 control-label">Component:</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" id="component" ref="component" onChange={this.handleInputChange}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="release" className="col-sm-4 control-label">Release:</label>
                            <Col sm={4} >
                                <select className="form-control" id="release" ref="release" required="required" onChange={this.handleInputChange}>
                                   {releases}
                                </select>
                            </Col>
                        </div>
                        <div className="form-group">
                            <label htmlFor="contact" className="col-sm-4 control-label">Contact Role:</label>
                            <Col sm={4} >
                                <select className="form-control" id="contact" ref="contact" required="required" onChange={this.handleInputChange} >
                                   {contacts}
                                </select>
                            </Col>
                        </div>
                        <div className="form-group">
                            <Col sm={8} smOffset={2} className="text-center">
                                <Button type="submit">Search</Button>
                            </Col>
                        </div>
                    </form>
                </Col>
            </Row>
        );
    }
});

var Browser = React.createClass({
    render: function () {
        if (!this.props.showresult) {
            return <div />;
        }
        var contacts = this.props.data.map(function (c) {
            var release = null;
            var component = null;
            if (c.component.release) {
                release = c.component.release;
                component = c.component.name;
            }
            else {
                release = "N/A";
                component = c.component;
            }
            return (<ContactView key={c.url} data={c} component={component} release={release} />);
        }.bind(this));
        return (
            <form className="form-horizontal" >
            <div>
                <Col md={10} mdOffset={1}>
                    <h3 className="text-center"> Results </h3>
                </Col>
                <Col md={6} mdOffset={3}>
                    <table>
                        <thead>
                            <tr>
                                <th className="col-sm-1">Component</th>
                                <th className="col-sm-1">Release</th>
                                <th className="col-sm-1">Email</th>
                                <th className="col-sm-1">Contact Role</th>
                            </tr>
                        </thead>
                        <tbody className="text-left">
                            {contacts}
                        </tbody>
                    </table>
                </Col>
            </div>
            </form>
        );
    }
});

var ContactView = React.createClass({
    render: function () {
        return (
            <tr>
                <td><p className="form-control-static">{this.props.component}</p></td>
                <td><p className="form-control-static">{this.props.release}</p></td>
                <td><p className="form-control-static">{this.props.data.contact.email}</p></td>
                <td><p className="form-control-static">{this.props.data.role}</p></td>
            </tr>
        );
    }
});

React.render(
    <ContactBrowserApp />,
    document.getElementById('app')
);
