/**
 * Created by adeng on 2016/11/21.
 */
import React from 'react';
//import ReactDOM from 'react-dom';

var Footer = React.createClass({
    render: function() {
        return (
            <div className="footer">
                <div className="footer-inner">
                    <div className="footer-content">
                    <span className="bigger-120">
                        <span className="blue bolder">playwolf719</span>
                        &copy; 2015-2016
                    </span>
                    </div>
                </div>
            </div>
        );
    }
});
module.exports = Footer;