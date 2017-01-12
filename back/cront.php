<?php
/**
 * Created by PhpStorm.
 * User: adeng
 * Date: 2016/12/20
 * Time: 17:03
 */
$redis = new Redis();
$redis->connect('localhost', 6379);

// 获取现有消息队列的长度
$count = 0;
$max = $redis->lLen("my80-log-list");

// 获取消息队列的内容，拼接sql
$insert_sql = "insert into tbl_log (`appId`,`remoteIp`,`request`, `agent`,`statusCode`,`createTime`) values ";

// 回滚数组
$roll_back_arr = array();

while ($count < $max) {
    $log_info = $redis->rPop("my80-log-list");
    $roll_back_arr[] = $log_info;
    if ($log_info == 'nil' || !isset($log_info) || empty($log_info) ) {
        break;
    }

    // 切割出时间和info
    $log_info = str_replace("'", '"', $log_info);
    $log_info=json_decode($log_info,true);
    if(empty($log_info["request"]) ){
        break;
    }
    $tmp=explode(":",explode(" ",$log_info["time"])[0]);
    $date_array=date_parse($log_info["time"]);
    $log_info["time"] = date('Y-m-d H:i:s', mktime($date_array['hour'], $date_array['minute'], $date_array['second'], $date_array['month'], $date_array['day'], $date_array['year']));
//    echo "<br>";
//    var_dump($log_info);
//    echo "<br>";
    $insert_sql .= " (1,'".$log_info["ip"]."','".$log_info["request"]."','".$log_info["agent"]."','".$log_info["status_code"]."','".$log_info["time"]."'),";
    $count++;
}

// 判定存在数据，批量入库
if ($count != 0) {
    $link = mysqli_connect('localhost:3306', 'admin', '123456');
    if (!$link) {
        die("Could not connect:");
    }


    $date=date('Y-m-d');
    $dateTime=date("Y-m-d H:i:s");
    $uv=$redis->hLen("my80-log-iphash-".$date);
    $pvIncr=$max;

    $update_sql='INSERT INTO tbl_comm (appId, pv, uv,logDate,createTime,updateTime) VALUES (1, '.$pvIncr.', '.$uv.',"'.$date.'","'.$dateTime.'","'.$dateTime.'" )
    ON DUPLICATE KEY UPDATE pv=pv+'.$pvIncr.',uv='.$uv.',updateTime="'.$dateTime.'";';
//    var_dump($update_sql);

    $crowd_db = mysqli_select_db($link,'log-admin');
    $insert_sql = rtrim($insert_sql,",").";";
//    $sql=$insert_sql.$update_sql;
    $res = mysqli_query($link,$insert_sql);
    $res1=mysqli_query($link,$update_sql);

//    var_dump($insert_sql);
//    var_dump(mysqli_error($link));

    // 输出入库log和入库结果;
    echo date("Y-m-d H:i:s")." insert ".$count." log info result:";
    echo json_encode($res);

    // 数据库插入失败回滚
    if(!$res){
        foreach($roll_back_arr as $k){
            $redis->lPush("my80-log-list", $k);
        }
    }



    mysqli_close($link);
}

// 释放redis
$redis->close();
