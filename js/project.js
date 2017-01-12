var common= {
    errorHandler: function (errorMsg) {
        errorMsg = errorMsg || "网络繁忙，请稍后重试。";
        // 操作失败
        if(errorMsg=="nologin"){
            location.reload();
        }else{
            bootbox.dialog({
                message: errorMsg,
                buttons: {
                    ok: {
                        className: "btn btn-danger"
                    }
                }
            });
            //location.reload();
        }

    },
    firstLetterUpper:function(str) {
        return str.charAt(0).toUpperCase()+str.slice(1);
    },
    paramToJson:function(param){
        return JSON.parse('{"' + decodeURI(param).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')
    },
    timeDropdown:function(){
        var str=$("#recentTime").text();
        var dur=str.substr(2,str.length );
        var dt = new Date();

        switch (dur){
            case "30分钟":
                dur=30;
                break;
            case "1小时":
                dur=60;
                break;
            case "3小时":
                dur=3*60;
                break;
            case "6小时":
                dur=6*60;
                break;
            case "12小时":
                dur=12*60;
                break;
            case "1天":
                dur=24*60;
                break;
            case "3天":
                dur=3*24*60;
                break;
            case "7天":
                dur=7*24*60;
                break;
            case "15天":
                dur=15*24*60;
                break;
            case "30天":
                dur=30*24*60;
                break;
            case "60天":
                dur=60*24*60;
                break;
            default :
                dur=30;
                break;
        }
        var fromDate = moment(dt).format('YYYY-MM-DD HH:mm:ss');
        var toDate = moment(new Date(dt.getTime()-1000*60*dur )).format('YYYY-MM-DD HH:mm:ss');
        var res={};
        res.from=fromDate;
        res.to=toDate;
        return res;
    },
    listAjax:function(url,params){
        console.log(params.data);

        var tmp=params.data;
        var page=Math.ceil(tmp.offset/(tmp.limit))+1;

        //var time=this.timeDropdown();
        var myparam={
            "page":page?page:"",
            "limit":tmp.limit?tmp.limit:"",
            "orderby":typeof(tmp.sort) != "undefined"?tmp.sort:"",
            "order":tmp.order?tmp.order:"",
            //"dur":tmp.dur,
            //"from":('from' in tmp)?tmp.from:time.from,
            //"to":('to' in tmp)?tmp.to:time.to,
            //"hostid":('hostid' in tmp)?tmp.hostid:"",
            //"urlid":('urlid' in tmp)?tmp.urlid:"",
            "appId":('appId' in tmp)?tmp.appId:"",
        };

        console.log($.param(myparam));

        $.ajax({
            type: 'get',
            url: url,
            dataType: 'json',
            data : $.param(myparam),
            success: function(res) {
                console.log(res);
                if(res["code"]==0){
                    params.success({
                        total: res.data.total,
                        rows: res.data.rows,
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

};
function setCookie(c_name,value,expiredays)
{
    var exdate=new Date()
    exdate.setDate(exdate.getDate()+expiredays)
    document.cookie=c_name+ "=" +escape(value)+
        ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
}

function getCookie(c_name)
{
    if (document.cookie.length>0)
    {
        c_start=document.cookie.indexOf(c_name + "=")
        if (c_start!=-1)
        {
            c_start=c_start + c_name.length+1
            c_end=document.cookie.indexOf(";",c_start)
            if (c_end==-1) c_end=document.cookie.length
            return unescape(document.cookie.substring(c_start,c_end))
        }
    }
    return ""
}
/*
 *
 * app related function
 *
 */


function appListAjax(params) {
    common.listAjax("/log-admin/back/app_index.php",params);
}

function urlListAjax(params){
    common.listAjax("/log-admin/back/log_index.php",params);
}

function callListAjax(params){
    common.listAjax("/api/call/list",params);
}

function appHostnameFormatter(value, row){
    return '<a href="'+value+'" target="_blank">'+value+'</a>';
}

function appOperateFormatter(value, row){
    return '<a href="#/url/index/'+row.id+'" ><i class="glyphicon glyphicon-eye-open"></i></a>';
}

function urlOperateFormatter(value, row){
    return '<a href="#/call/index/'+row.urlId+row.urlname+'" ><i class="glyphicon glyphicon-eye-open"></i></a>';
}
function callWtRatioFormatter(value, row){
    return value+"%";
}