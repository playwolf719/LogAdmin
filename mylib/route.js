import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'

import Index from './module/common/index.js';

render((
    <Router history={hashHistory}>
        {/* <Route path="/"  title1="已制作的模板" component={TmplEdit}/>
        <Route path="/tmpl/:operate/:type/:id"  component={TmplEdit}/>
        <Route path="/tmpl/:operate/:type"  component={TmplEdit}/>
        <Route path="/tmpl/list" title1="已制作的模板" component={TmplEdit}/>

        <Route path="/region/create" title1="制作专区"  component={RegionEdit}/>

        <Route path="/region/list" title1="专区管理"   component={RegionList}/>
        */}
        <Route path="/" title1="应用"   component={Index}/>
        <Route path="/app/index" title1="应用"   component={Index}/>
        <Route path="/url/index/:appId" title1="日志分析（每分钟实时刷新一次）"   component={Index}/>
        <Route path="/service/index/:appId" title1="内部分析"   component={Index}/>

        <Route path="/call/index/:urlid" title1="方法调用"   component={Index}/>


    </Router>

), document.getElementById('main-container'));
