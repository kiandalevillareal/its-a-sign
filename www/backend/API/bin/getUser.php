<?php
// Project: Corellea Mobile Application

// Dev: Casulla, Jerald E.

// The program is important for the following:
// -Getting User data

// Project Started: April 26, 2023
// Project Ended: TBA
// Program Revised: June 16, 2023

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
include_once '../database.php';
include_once '../user.php';

$database = new Database();
$db = $database->getConnection();
$item = new User($db);
$item->email = isset($_POST['email']) ? $_POST['email'] : die();
$item->password = $_POST['password'];
$item->authenticateUser();

if($item->id != null)
{
    $emp_arr = array(
        "id" => $item->id,
        "name" => $item->name,
        "email" => $item->email,
        "password" => $item->password,
        "position" => $item->position,
        "role" => $item->role
    );

    http_response_code(200);
    echo json_encode($emp_arr);
}
else
{
    http_response_code(404);
    echo json_encode("USER NOT FOUND");
}
?>