<?php 
    header("Content-type=text/html;charset=utf-8");
    include 'connect.php';
    // var_dump($_GET['pageNo']);

    $idx=isset($_GET['id']) ? $_GET['id'] : null;

    // var_dump($idx);
    

    $sql = "select * from goods where id='$idx'";
    

    $result = $conn->query($sql);

    $row = $result->fetch_all(MYSQLI_ASSOC);

    // var_dump($row);
    
    $result->close();
    

    echo json_encode($row);
 ?>