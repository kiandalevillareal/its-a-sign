<?php
// Project: It's A Sign Application
// Dev: Casulla, Jerald E.
// Project Started: June 12, 2023
// Project Ended: TBA

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, oAccess-Control-Allow-Headers, Authorization, X-Requested-With");
include_once '../database.php';
include_once '../session.php';

$database = new Database();
$db = $database->getConnection();
$item = new Session($db);
// $item->username = isset($_POST['username']) ? $_POST['username'] : die();
$item->session_id = $_POST['session_id'];

if($item->endSession())
{
    echo json_encode("session ended");
}
else
{
    echo json_encode("session not ended");
}
?>