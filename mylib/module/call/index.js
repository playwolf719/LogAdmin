/**
 * Created by adeng on 2016/11/18.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import PageHeader from '../common/page_header.js';
import TimeDropdown from '../common/time_dropdown.js';
//var $appTable = $('#appTable');



var CallIndex = React.createClass({
    componentDidMount:function(){
        this.initTable();

    },
    initTable: function() {
        var _this=this;
        $("#table").bootstrapTable({
            classes : "table table-bordered table-hover table-striped",//加载的样式
            ajax : "callListAjax",//自定义ajax
            search : false,//不开启搜索文本框
            sidePagination : "server",//使用服务器端分页
            pagination : "true",//开启分页
            queryParams : function(params){
                params.urlid=_this.props.params.urlid;
                return params;
            },
            sortable:true,
            sortOrder:"desc",
            pageSize : 15,//每页大小
            pageList : [15,30, 50, 100],//可以选择每页大小

            //columns: [
            //    {
            //        field: 'operate',
            //        title: 'Item Operate',
            //        formatter: appOperateFormatter
            //    }
            //]
        });
    },
    timeDropdownFunc:function(param){
        if(Object.keys(param).length === 0){
            $("#table").bootstrapTable("refresh");
        }else if( "query" in param){
            $("#table").bootstrapTable("refresh",param);
        }else{
            common.errorHandler("组件错误！");
        }
    },
    render:function() {
        var d = new Date();

        var timeFlag=d.getTime();
        return (

        <div className="page-part col-sm-12 ">

            <div className="page-content">

                <div className="row">
                    <TimeDropdown /*{...this.props} 这部分是用来传递父元素属性的，包括函数属性等等等。右边的myCallback则只传递函数*/ myCallback={this.timeDropdownFunc }/>
                </div>

                <div className="row">
                    <table id="table"  >
                        <thead>
                        <tr>
                            <th data-field="callName" data-sortable="true" >调用名称</th>
                            <th data-field="callType" data-sortable="true">调用类型</th>
                            <th data-field="wt" data-sortable="true">平均执行时间</th>
                            <th data-field="maxExecTime" data-sortable="true">最大执行时间</th>
                            <th data-field="minExecTime" data-sortable="true">最小执行时间</th>
                            <th data-field="wtRatio" data-sortable="true" data-formatter="callWtRatioFormatter">执行时间占比</th>
                            <th data-field="ct" data-sortable="true">调用次数</th>
                        </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>

        );

    }
});

export default CallIndex;
