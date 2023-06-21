<?php
// Project: It's A Sign Application
// Dev: Casulla, Jerald E.
// Project Started: June 12, 2023
// Project Ended: TBA

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, 
    oAccess-Control-Allow-Headers, Authorization, X-Requested-With");
include_once '../database.php';
include_once '../user.php';

$database = new Database();
$db = $database->getConnection();
$item = new User($db);
// $item->username = isset($_POST['username']) ? $_POST['username'] : die();
$item->username = $_POST['username'];

if($item->createUser())
{
    http_response_code(200);
    echo json_encode("user created");
}
else
{
    http_response_code(404);
    echo json_encode("user not created");
}
?>