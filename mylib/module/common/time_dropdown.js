import React from 'react';
//import ReactDOM from 'react-dom';

function BootboxContent(){
    var frm_str = '<form id="some-form">'
        + '<div class="form-group">'
        + '<label for="fromDate">开始日期</label>'
        + '<input id="fromDate" class="date span2 form-control input-sm"  placeholder="dd-mm-yy" type="text">'
        + '<label for="toDate">结束日期</label>'
        + '<input id="toDate" class="date span2 form-control input-sm" placeholder="dd-mm-yy" type="text">'
        + '</div>'
        + '</form>';

    //$('.input-daterange').datepicker({autoclose:true});

    var object = $('<div/>').html(frm_str).contents();

    object.find('.date').datepicker({
        format: 'yyyy-mm-dd',
        autoclose: true}).on('changeDate', function (ev) {
        $(this).blur();
        $(this).datepicker('hide');
        var toDate=object.find('#toDate').val();
        var fromDate=object.find('#fromDate').val();
        var toDateTime=new Date(toDate);
        var fromDateTime=new Date(fromDate);
        if(toDateTime<=fromDateTime) {
            common.errorHandler("自定义时间错误，请重新输入！");
        }
    });


    return object
}

var TimeDropdown = React.createClass({
    componentDidMount:function(){
        //this 的作用范围在方法里，想传递进其他函数
        // 1是做参数传入
        // 2是做成全局变量
        var _this=this;
        $("#recentTime").next("ul").children("li").off("click").on("click",function(){
            var tmp=$(this).text();
            if(tmp.substr(2,tmp.length )!="义"){
                $("#recentTime").html('最近'+tmp.substr(2,tmp.length )+'<span class="caret"></span>' );
                _this.props.myCallback({});
            }else{
                $("#recentTime").html(tmp+'<span class="caret"></span>' );
                bootbox.dialog({
                    message: BootboxContent,
                    title: "自定义时间区间",
                    buttons: {
                        test: {
                            label: "确定",
                            className: "btn-primary",
                            callback: function() {
                                var toDate=$("#toDate").val();
                                var fromDate=$("#fromDate").val();
                                var toDateTime=new Date(toDate);
                                var fromDateTime=new Date(fromDate);
                                //console.log(toDate);
                                //console.log(fromDate);
                                if(toDateTime<=fromDateTime||!toDate||!fromDate){
                                    common.errorHandler("自定义时间错误，请重新输入！");
                                }else{
                                    _this.props.myCallback({query: {to: toDate,from:fromDate }});
                                }
                            }

                        }
                    },
                });
            }
        });


    },
    render: function() {
        return (
            <div className="dropdown">
                <button id="recentTime" className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" >最近30分钟<span className="caret"></span></button>
                <ul className="dropdown-menu">
                    <li><a href="javascript:void(0);">最近30分钟</a></li>
                    <li><a href="javascript:void(0);">最近1小时</a></li>
                    <li><a href="javascript:void(0);">最近3小时</a></li>
                    <li><a href="javascript:void(0);">最近6小时</a></li>
                    <li><a href="javascript:void(0);">最近12小时</a></li>
                    <li><a href="javascript:void(0);">最近1天</a></li>
                    <li><a href="javascript:void(0);">最近3天</a></li>
                    <li><a href="javascript:void(0);">最近7天</a></li>
                    <li><a href="javascript:void(0);">最近15天</a></li>
                    <li><a href="javascript:void(0);">最近30天</a></li>
                    <li><a href="javascript:void(0);">最近60天</a></li>
                    <li><a href="javascript:void(0);">自定义</a></li>
                </ul>
            </div>
        );
    }
});
module.exports = TimeDropdown;