/**
 * Created by adeng on 2016/11/18.
 */
//这个方法同样奏效
//import echarts from "../../../js/echarts.min.js";

import React from 'react';
//import ReactDOM from 'react-dom';
//import PageHeader from '../common/page_header.js';
//import TimeDropdown from '../common/time_dropdown.js';
//var $appTable = $('#appTable');
var elementResizeEvent = require('element-resize-event');

var UrlIndex = React.createClass({
    getInitialState: function() {
        return {appid:"",hostname:""};
    },
    componentDidMount:function(){
        this.initTable();
        this.initChart();
        var _this=this;
        setInterval(function () {
            $("#urlRespTable").bootstrapTable("refresh");
            _this.initChart();
        }, 61000);

    },
    initTable: function() {
        var _this=this;
        $("#urlRespTable").bootstrapTable({
            classes : "table table-hover table-striped",//加载的样式
            ajax : "urlListAjax", //自定义ajax
            search : false,//不开启搜索文本框
            sidePagination : "server",//使用服务器端分页
            pagination : "true",//开启分页
            queryParams : function(params){
                params.appId=_this.props.params.appId;
                return params;
            },
            //showHeader:false,
            sortable:true,
            sortOrder:"desc",
            pageSize : 15,//每页大小
            pageList : [5,15,30, 50, 100],//可以选择每页大小
        });

    },
    initChart:function(){

        var myparam={
            "appId":this.props.params.appId
        };

        $.ajax({
            type: 'get',
            url: "/log-admin/back/comm_index.php",
            dataType: 'json',
            data : $.param(myparam),
            success: function(res) {
                console.log(res);
                if(res["code"]==0){
                    var myChart2 = echarts.init(document.getElementById('chart2'));
                    var data=res.data.rows;
                    var pv=new Array()
                    var uv=new Array()
                    for (var prop in data) {
                        pv.push(data[prop]["pv"]);
                        uv.push(data[prop]["uv"]);
                    }
                    pv.reverse();
                    uv.reverse();

                    var option2 = {
                        title: {
                            text: '访问量'
                        },
                        tooltip : {
                            trigger: 'axis'
                        },
                        legend: {
                            data:['PV','UV']
                        },
                        toolbox: {
                            feature: {
                                saveAsImage: {}
                            }
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        xAxis : [
                            {
                                type : 'category',
                                boundaryGap : false,
                                data : Object.keys(data).reverse()
                            }
                        ],
                        yAxis : [
                            {
                                type : 'value'
                            }
                        ],
                        series : [
                            {
                                name:'PV',
                                type:'line',
                                areaStyle: {normal: {}},
                                label: {
                                    normal: {
                                        show: true,
                                        position: 'top'
                                    }
                                },
                                data:pv
                            },
                            {
                                name:'UV',
                                type:'line',
                                areaStyle: {normal: {}},
                                label: {
                                    normal: {
                                        show: true,
                                        position: 'top'
                                    }
                                },
                                data:uv
                            },
                        ]
                    };
                    myChart2.setOption(option2);


                    window.onresize = function () {
                        myChart2.resize();
                    }

                    var element = document.getElementById("chartRow");

                    elementResizeEvent(element, function() {
                        myChart2.resize();
                    });
                }else{
                    this.errorHandler(res.msg);
                    //console.log(data);
                }
            }.bind(this),
            error: function(xhr, status, err) {
                this.errorHandler();
                console.log( xhr);
            }.bind(this)
        });


    },
    timeDropdownFunc:function(param){
        if(Object.keys(param).length === 0){
            $("#urlRespTable").bootstrapTable("refresh");
        }else if( "query" in param){
            $("#urlRespTable").bootstrapTable("refresh",param);
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

                    <div className="row" id="chartRow" >
                        <div id="chart2" className="my-chart-400" >

                        </div>
                    </div>

                    <hr />

                    <div className="row">
                        <table id="urlRespTable" >
                            <thead>
                            <tr>
                                <th data-field="remoteIp" data-sortable="true" >访问者ip</th>
                                <th data-field="request" data-sortable="true">请求</th>
                                <th data-field="agent" data-sortable="true">用户代理</th>
                                <th data-field="statusCode" data-sortable="true">状态码</th>
                                <th data-field="createTime" data-sortable="true">创建时间</th>
                            </tr>
                            </thead>
                        </table>
                    </div>


                </div>
            </div>
        );

    }
});

export default UrlIndex;
