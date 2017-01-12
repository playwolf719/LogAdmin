<?php
/**
 * Created by PhpStorm.
 * User: playwolf
 * Date: 12/21/2016
 * Time: 5:02 PM
 */
require_once("Common.php");

$conn = mysqli_connect('localhost:3306', 'admin', '123456','log-admin');

if($conn->connect_errno > 0){
    die('Unable to connect to database [' . $db->connect_error . ']');
}
$appId=$_GET['appId']?$_GET['appId']:1;

$date=date('Y-m-d');
$date10ago=date("Y-m-d",strtotime("-9 day" ));
//$date="2016-12-21";
$sql="select logDate,pv,uv from tbl_comm WHERE appId=$appId and logDate BETWEEN \"$date10ago\" AND \"$date\" limit 10";


$res = $conn->query($sql);
$output=array();
$total=10;

//var_dump();
//var_dump($_GET);
for($i=0;$i<10;$i++){
    $date1=date("Y-m-d",strtotime("-".$i." day" ));
    $output[$date1]["pv"]=0;
    $output[$date1]["uv"]=0;
}

while($row = $res->fetch_assoc()){
    $output[$row["logDate"]]["pv"]=$row["pv"];
    $output[$row["logDate"]]["uv"]=$row["uv"];
}
$tmp=array(
    "total"=>$total,
    "rows"=>$output
);

echo Common::toJson($tmp);