<?php

    //引入数据库文件
    include "connect.php";

    //接收前端传回来的信息
    $username = isset($_POST['username'])?$_POST['username']:null;
    $password = isset($_POST['password'])?$_POST['password']:null;
    $password = md5($password);
    //sql语句
    $sql = "select * from reg where username='$username' AND password='$password'";

    //执行sql语句
    $result = $conn->query($sql);

    //使用查询结果集
    //得到数组
    // $row = $result->fetch_all(MYSQLI_ASSOC);

    // echo json_encode($row,JSON_UNESCAPED_UNICODE);

    // 判断是否含有前端传过来的值
    if(($result->num_rows)>0){

        echo 'yes';

    }else{

        echo 'no';
    }

        //释放查询结果集，避免资源浪费
    $result->close();


    // 关闭数据库，避免资源浪费
    $conn->close();






?>