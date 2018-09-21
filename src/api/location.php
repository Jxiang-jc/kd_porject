<?php 
    header("Content-type=text/html;charset=utf-8");
    include 'connect.php';
    // var_dump($_GET['pageNo']);

    $idx=isset($_GET['id']) ? $_GET['id'] : null;
    $name = isset($_GET['name']) ? $_GET['name']: null;
    // var_dump($idx);
    
    if($name){
        $sql = "select * from location where name='$name'";
    }else{
        $sql = "select * from location";
    }
    


    $result = $conn->query($sql);

    $row = $result->fetch_all(MYSQLI_ASSOC);

    // var_dump($row);
    
    $result->close();
    

    echo json_encode($row);
 ?>
