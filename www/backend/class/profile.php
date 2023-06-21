<?php
// Project: Corellea Mobile Application

// Dev: Casulla, Jerald E.

// The program is important for the following:
// -Data Logic for getting profile of patients

// Project Started: April 26, 2023
// Project Ended: TBA
//  Program Revised: June 16, 2023
class Profile
{
    private $db;
    private $db_table = "patients";

    public $id;
    public $LastName;
    public $FirstName;
    public $Initial;
    public $FullName;
    public $Birthday;
    public $Age;
    public $Sex;
    public $Email;
    public $Number;
    public $Address;
    public $updated_at;
    
    public $name;
    public $email;
    public $password;
    public $position;
    public $role;

    public function __construct($db)
    {
        $this->db = $db;
    }

    public function getProfileInfo()
    {
        $sqlQuery = 
            "SELECT * FROM "
            . $this->db_table .
            " WHERE id = "
            . $this->id;

        $record = $this->db->query($sqlQuery);
        $dataRow=$record->fetch_assoc();
        $this->id = $dataRow['id'];
        $this->PatientID = $dataRow['PatientID'];
        $this->LastName = $dataRow['LastName'];
        $this->FirstName = $dataRow['FirstName'];
        $this->Initial = $dataRow['Initial'];
        $this->FullName = $dataRow['FullName'];
        $this->Birthday = $dataRow['Birthday'];
        $this->Age = $dataRow['Age'];
        $this->AgeDesc = $dataRow['AgeDesc'];
        $this->Sex = $dataRow['Sex'];
        $this->Email = $dataRow['Email'];
        $this->Number = $dataRow['Number'];
        $this->Address = $dataRow['Address'];
        $this->deleted_at = $dataRow['deleted_at'];
        $this->created_at = $dataRow['created_at'];
        $this->updated_at = $dataRow['updated_at'];
    }

    public function updateProfileInfo()
    {
        $this->LastName = htmlspecialchars(strip_tags($this->LastName));
        $this->FirstName = htmlspecialchars(strip_tags($this->FirstName));
        $this->Initial = htmlspecialchars(strip_tags($this->Initial));
        $this->FullName = htmlspecialchars(strip_tags($this->FullName));
        $this->Birthday = htmlspecialchars(strip_tags($this->Birthday));
        $this->Age = htmlspecialchars(strip_tags($this->Age));
        $this->Sex = htmlspecialchars(strip_tags($this->Sex));
        $this->Email = htmlspecialchars(strip_tags($this->Email));
        $this->Number = htmlspecialchars(strip_tags($this->Number));
        $this->Address = htmlspecialchars(strip_tags($this->Address));
        $this->updated_at = htmlspecialchars(strip_tags($this->updated_at));

        $sqlQuery = "UPDATE ". $this->db_table .
            " SET LastName = '".$this->LastName."',
            FirstName = '".$this->FirstName."',
            Initial = '".$this->Initial."',
            FullName = '".$this->FullName."',
            Birthday = '".$this->Birthday."',
            Age = '".$this->Age."',
            Sex = '".$this->Sex."',
            Email = '".$this->Email."',
            Number = '".$this->Number."',
            Address = '".$this->Address."',
            updated_at = '".$this->updated_at."'
            WHERE id = ".$this->id;

        $this->db->query($sqlQuery);
        if($this->db->affected_rows > 0)
        {
            return true;
        }
            return false;
    }
}
?>