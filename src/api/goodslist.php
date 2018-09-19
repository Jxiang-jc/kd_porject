<?php
    header("Content-type=text/html;charset=utf-8");
    
	include "connect.php";//链接另一个PHP（内容是链接数据库）

	$page = isset($_GET['page']) ? $_GET['page'] : null;	//页数
	$qty = isset($_GET['qty']) ? $_GET['qty'] : null;		//每一页的商品数量
	$Datatype = isset($_GET['type']) ? $_GET['type'] : null;	//	数据排序顺序样式（按时间或按价格）

	//SQL语句，获得数据表的全部数据
	$sql = "select * from goodslist";
	$result = $conn->query($sql);
	$row = $result->fetch_all(MYSQLI_ASSOC);
	$result->close();

	
	function array_sort($array,$keys,$type='asc'){  
	//$array为要排序的数组,$keys为要用来排序的键名,$type默认为升序排序  
		$keysvalue = $new_array = array();
		foreach ($array as $k=>$v){
			$keysvalue[$k] = $v[$keys];  
		}  
		if($type == 'asc'){  
			asort($keysvalue);
		}else{  
			arsort($keysvalue);  
		}  
		reset($keysvalue);  
		foreach ($keysvalue as $k=>$v){  
			$new_array[$k] = $array[$k];  
		}  
			return $new_array;  
	}

	//如果传过来的是default则不用排序
	if ($Datatype === "default") {
		$msg = array(
			'total' => count($row),
			"data" => array_slice($row, ($page-1)*$qty, $qty),
			"page" => $page,
			"qty" => $qty
		);
	
		echo json_encode($msg);
	} else {
		//不是default的时候
		$newRow = array_sort($row, $Datatype, 'desc');

		$msg = array(
			'total' => count($newRow),
			"data" => array_slice($newRow, ($page-1)*$qty, $qty),
			"page" => $page,
			"qty" => $qty
		);
	
		echo json_encode($msg);
	}
 ?>