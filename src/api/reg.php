<?php
// 引入connect.php
include 'connect.php';
$user=isset($_POST['username'])?$_POST['username']:null;
$passw=isset($_POST['password'])?$_POST['password']:null;

if($user&&$passw){
    // 点击注册时再验证一次
    $sql = "select * from reg where username='$username'";

    $result = $conn->query($sql);

    if($result->num_rows>0){
        echo "fail";
    }else{
        // 对密码进行加密
        $passw = md5($passw);
        
        // 写入数据库
        $sql = "insert into reg(username,password) values('$user','$passw')";
        
        //执行sql语句
        $result = $conn->query($sql);

        if($result){
            echo "success";
            return;
        }else{
            echo "fail";
            return;
        }
    }
}
//验证用户名
if($user){
    $sql = "select * from reg where username = '$user'";

    //获取查询结果
    $result = $conn->query($sql);

    // var_dump($result) ;
    $row = $result->fetch_all(MYSQLI_ASSOC);

    //把结果输出到前台
    if($result->num_rows>0){
        echo "用户已存在";
    }else{
        echo "注册成功";
    }
}


//释放查询结果集，避免资源浪费
// $result->close();

// 关闭数据库，避免资源浪费
$conn->close();


?>