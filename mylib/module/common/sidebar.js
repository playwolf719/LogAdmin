/**
 * Created by adeng on 2016/11/21.
 */
import React from 'react';
//import ReactDOM from 'react-dom';

var Sidebar = React.createClass({
    componentDidMount:function(){
        const script = document.createElement("script");
        const script1 = document.createElement("script");
        const script2 = document.createElement("script");

        script.type="text/javascript";
        script1.type="text/javascript";
        script2.type="text/javascript";

        script.text='try{ace.settings.check("main-container" , "fixed")}catch(e){}';
        $("#main-container").prepend(script);

        script1.text='try{ace.settings.check("sidebar" , "fixed")}catch(e){};';
        $("#sidebar").prepend(script1);

        script2.text='try{ace.settings.check("sidebar" , "collapsed")}catch(e){};';
        $("#sidebar").append(script2);

    },

    render: function() {
        console.log(this.props);
        var appId=0;
        console.log(this.props.params)
        if ("appId" in this.props.params){
            //no cookie
            setCookie('appId',this.props.params.appId);
            appId=this.props.params.appId;
        } else {
            //have cookie
            appId=getCookie('appId');

        }
        var urlHref='#/url/index/'+appId;
        var serviceHref='#/service/index/'+appId;


        return (
            <div id="sidebar" className="sidebar responsive">
                <ul className="nav nav-list" id="theBigMenu">

                    <li className="">
                        <a href={urlHref} >
                            <i className="menu-icon fa fa-dashboard"></i>
                            <span className="menu-text"> 日志分析 </span>
                        </a>

                        <b className="arrow"></b>
                    </li>

                    <li className="">
                        <a href={serviceHref}>
                            <i className="menu-icon fa fa-paper-plane-o"></i>
                            <span className="menu-text"> 内部分析 </span>
                        </a>
                        <b className="arrow"></b>
                    </li>

                </ul>

                <div className="sidebar-toggle sidebar-collapse" id="sidebar-collapse">
                    <i className="ace-icon fa fa-angle-double-left" data-icon1="ace-icon fa fa-angle-double-left" data-icon2="ace-icon fa fa-angle-double-right"></i>
                </div>
            </div>
        );
    }
});
module.exports = Sidebar;