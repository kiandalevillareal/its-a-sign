<?php
// Project: Corellea Mobile Application

// Dev: Casulla, Jerald E.

// The program is important for the following:
// -Checking if user is a patient

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
    if(strval($item->role) == "patient" || strval($item->role) == "patient")
    {
        http_response_code(200);
        echo json_encode(strval($item->role));
    }
    else
    {
        http_response_code(200);
        echo json_encode("USER NOT A PATIENT");
    }
}
else
{
    http_response_code(404);
    echo json_encode("USER NOT FOUND");
}
?>