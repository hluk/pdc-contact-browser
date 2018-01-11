'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var ReactBootstrap = require('react-bootstrap');
var Modal = ReactBootstrap.Modal;

module.exports = React.createClass({
    render() {
        if (!this.props.show) {
            return <div />;
        }

        return (
            <Modal show={this.props.show} onHide={this.props.onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Permission Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <p>
                        PDC Contact Browser does not implement its own
                        permission system. Instead it relies on PDC API to
                        verify users have correct permissions.
                    </p>

                    <p>
                        When the browser is loaded, it will use a local Kerberos
                        ticket to request an authentication token from PDC
                        server. This token is then used for later requests. It
                        is also cached by the browser to improve performance
                        next time the contact browser is used.
                    </p>

                    <p>On the server you need to have access to the following end-points:</p>

                    <ul>
                        <li><code>contact-roles</code></li>
                        <li><code>contacts/mailing-lists</code></li>
                        <li><code>contacts/people</code></li>
                        <li><code>global-components</code></li>
                        <li><code>release-components</code></li>
                        <li><code>global-components-contacts</code></li>
                        <li><code>release-components-contacts</code></li>
                    </ul>

                    <p>
                        Read access is needed for all of these. If you want to
                        create new contact mappings, you will need write access
                        to the last two end-points. That will allow you to
                        assign existing contacts to components. Creating new
                        contacts requires write access to the <code>contacts/*</code>
                        end-points.
                    </p>

                </Modal.Body>
            </Modal>
        );
    }
});
