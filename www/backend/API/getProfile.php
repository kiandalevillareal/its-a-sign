<?php
// Project: Corellea Mobile Application

// Dev: Casulla, Jerald E.

// The program is important for the following:
// -Data Output for getting profile of patients

// Project Started: April 26, 2023
// Project Ended: TBA
// Program Revised: May 20, 2023

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
$item->getProfileInfo();

if($item->id != null)
{
    $emp_arr = array(
        "id" => $item->id,
        "patient_id" => $item->PatientID,
        "last_name" => $item->LastName,
        "first_name" => $item->FirstName,
        "initial" => $item->Initial,
        "full_name" => $item->FullName,
        "birthday" => $item->Birthday,
        "age" => $item->Age,
        "age-desc" => $item->AgeDesc,
        "sex" => $item->Sex,
        "email" => $item->Email,
        "number" => $item->Number,
        "address" => $item->Address,
        "deleted_at" => $item->deleted_at,
        "created_at" => $item->created_at,
        "updated_at" => $item->updated_at
    );

    http_response_code(200);
    echo json_encode($emp_arr);
}
else
{
    http_response_code(404);
    echo json_encode("Employee not found.");
}
?>