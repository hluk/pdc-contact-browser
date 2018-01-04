'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var $ = require('jquery')

module.exports = React.createClass({
    componentDidMount() {
        $.ajax({
            url: "templates/footer.html",
            dataType: "html",
        }).done((response) => {
            var html = {__html: response};
            var component = <div dangerouslySetInnerHTML={html} />;
            this.setState({component: component}, this.updateVersionElementText);
        });
    },

    updateVersionElementText() {
        var footer = $(ReactDOM.findDOMNode(this));
        var version = footer.find(".version");
        version.text(VERSION);
    },

    getInitialState() {
        return { component: <div className="footer" /> };
    },

    render() {
        return this.state.component;
    }
});
