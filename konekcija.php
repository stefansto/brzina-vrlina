<?php 
	//Insert database credentials
	$serverBaze = "localhost";
	$nazivBaze = "";
	$username = "";
	$password = "";
	try{
		$konekcija = new PDO("mysql:host=$serverBaze;dbname=$nazivBaze", $username, $password);
		$konekcija->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		$konekcija->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
	}catch(PDOException $e){
		echo "Greska sa konekcijom: $e";
	}
?>