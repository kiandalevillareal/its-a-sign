<?php
// Project: Corellea Mobile Application

// Dev: Casulla, Jerald E.

// The program is important for the following:
// -Data Output for getting profile of patients

// Project Started: April 26, 2023
// Project Ended: TBA
//  Program Revised: June 16, 2023

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
include_once '../database.php';
include_once '../profile.php';

$database = new Database();
$db = $database->getConnection();
$item = new Profile($db);
$item->id = isset($_POST['id']) ? $_POST['id'] : die();

$item->LastName = $_POST['lastname'];
$item->FirstName = $_POST['firstname'];
$item->Initial = $_POST['initial'];
$item->FullName = $_POST['fullname'];
$item->Birthday = $_POST['birthday'];
$item->Age = $_POST['age'];
$item->Sex = $_POST['sex'];
$item->Email = $_POST['email'];
$item->Number = $_POST['number'];
$item->Address = $_POST['address'];
$item->updated_at = date('Y-m-d H:i:s');

if($item->updateProfileInfo()){
    echo json_encode("Successful");
} 
else
{
    echo json_encode("Failed");
}
?>