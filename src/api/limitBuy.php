<?php
    /*
        验证用户有效性
            * 验证用户是否被占用(用户是否存在数据库)
     */
    
    include 'connect.php';
    
    $param = isset($_GET['param']) ? $_GET['param'] : null;
    $del = isset($_GET['del']) ? $_GET['del'] : null;

    // var_dump($tejia);

    if($param == 'tejia'){
        $sql = "select * from limitbuy where tejia='ture'";
    }else if($param == 'hotSale'){
        $sql = "select * from limitbuy where hotSale='ture'";   
    }else if($param == 'evaluate'){
        $sql = "select * from limitbuy where evaluate='ture'";  
    }else if($param == 'newGoods'){
        $sql = "select * from limitbuy where newGoods='ture'"; 
    }else if($param == 'secTab'){
        $sql = "select * from limitbuy where secTab='ture' order by rand() limit 4"; 
    }else if($del == 1){
        $sql = "select * from limitbuy where del='1' limit 4"; 
    }

    // $sql = "select * from limitbuy"; 

    // var_dump($sql);

    // 执行sql语句
    $result = $conn->query($sql);

    // var_dump($result);

    //读取所有的数据
    $row = $result->fetch_all(MYSQLI_ASSOC);

    // var_dump($row);

    //避免资源浪费
    $result->close();

    echo json_encode($row,JSON_UNESCAPED_UNICODE);

?>  