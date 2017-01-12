<?php
/**
 * Created by PhpStorm.
 * User: playwolf
 * Date: 12/21/2016
 * Time: 5:19 PM
 */
class Common{
    public static function toJson($data="",$code=0,$msg="ok"){
        $res=array(
            "code"=>$code,
            "msg"=>$msg,
            "data"=>$data
        );
        return json_encode($res);
    }
}