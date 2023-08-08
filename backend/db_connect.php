<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header('Access-Control-Allow-Origin: *'); 
header('Content-Type: application/json');
header("Access-Control-Allow-Headers: Content-Type"); 

$host = 'localhost';
$username = 'zero';
$password = '1234';
$dbname = 'employeedb';

$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>