import React from 'react';
//import ReactDOM from 'react-dom';
//import TimeDropdown from '../common/time_dropdown.js';
//var $appTable = $('#appTable');



var AppIndex = React.createClass({
    componentDidMount:function(){
        this.initTable();
    },
    initTable: function() {
        $("#appTable").bootstrapTable({
            classes : "table table-bordered table-hover table-striped",//加载的样式
            ajax : "appListAjax",//自定义ajax
            search : false,//不开启搜索文本框
            sidePagination : "server",//使用服务器端分页
            pagination : "true",//开启分页
            //queryParams : "appListQuery",//自定义参数
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
            $("#appTable").bootstrapTable("refresh");
        }else if( "query" in param){
            $("#appTable").bootstrapTable("refresh",param);
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
                        <table id="appTable"  >
                            <thead>
                            <tr>
                                <th data-field="name" data-sortable="true" >名称</th>
                                <th data-field="hostname" data-sortable="true" data-formatter="appHostnameFormatter">域名</th>
                                <th data-field="createTime" data-sortable="true">创建时间</th>
                                <th data-field="operate"  data-formatter="appOperateFormatter">查看详情</th>
                            </tr>
                            </thead>
                        </table>
                    </div>

                </div>

            </div>
        );

    }
});

export default AppIndex;
