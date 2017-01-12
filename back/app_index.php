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

$page=$_GET["page"]?intval($_GET["page"]):1;
$limit=$_GET["limit"]?intval($_GET["limit"]):10;
$orderby=$_GET["orderby"]?$_GET["orderby"]:"id";
$order=$_GET["order"]?$_GET["order"]:"desc";

$limitSql = ($page - 1) * $limit . ',' . $limit;
$sql="select * from tbl_app order by $orderby $order limit $limitSql";
$res = $conn->query($sql);
$output=array();

$sql="select count(*) from tbl_app";
$res1 = $conn->query($sql);
$total = $res1->fetch_row()[0];

//var_dump();
//var_dump($_GET);

while($row = $res->fetch_assoc()){
    $output[]=$row;
}
$tmp=array(
    "total"=>$total,
    "rows"=>$output
);

echo Common::toJson($tmp);