/**
 * Created by adeng on 2016/11/21.
 */
import React from 'react';
//import ReactDOM from 'react-dom';

import PageHeader from './page_header.js';
import Sidebar from './sidebar.js';
import Footer from './footer.js';

import AppIndex from '../app/index.js';
import UrlIndex from '../url/index.js';
import CallIndex from '../call/index.js';
import ServiceIndex from '../service/index.js';

var Index = React.createClass({
    componentDidMount:function(){

    },
    render: function() {

        var side;
        var index;
        if(this.props.route.path.indexOf("url/index")>-1 ){
            side = <Sidebar {...this.props} />;
            index = <UrlIndex {...this.props}/>;
        }else if(this.props.route.path.indexOf("service/index")>-1 ){
            side = <Sidebar {...this.props} />;
            index = <ServiceIndex {...this.props} />;
        }else if(this.props.route.path.indexOf("call/index")>-1 ){
            side = <Sidebar {...this.props} />;
            index = <CallIndex {...this.props} />;
        }else{
            index=<AppIndex />;
        }

        return (
            <div className="my-content">
                {side}
                <div className="main-content">
                    <div className="main-content-inner">
                        <PageHeader title1={this.props.route.title1}  />
                        {index}
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
});
module.exports = Index;