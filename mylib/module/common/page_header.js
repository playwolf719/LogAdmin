/**
 * Created by adeng on 2016/7/27.
 */
import React from 'react';
//import ReactDOM from 'react-dom';

var PageHeader = React.createClass({
    render: function() {

        let html;
        if (this.props.title2!=null) {
            html = (
                <small >
                    <i className="ace-icon fa fa-angle-double-right" ></i>
                    &nbsp;&nbsp;
                    {this.props.title2}
                </small>
            )
        }

        let html_notice;
        if (this.props.notice!=null) {
            html_notice = (
                <small >
                    &nbsp;&nbsp;
                    {this.props.notice}
                </small>
            )
        }

        return (
            <div className="page-header col-sm-12">
                <h1>
                    {this.props.title1}
                    {html}
                    {html_notice}
                </h1>
            </div>
        );
    }
});
module.exports = PageHeader;