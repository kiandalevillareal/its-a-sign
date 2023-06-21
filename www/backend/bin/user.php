<?php
// Project: Corellea Mobile Application

// Dev: Casulla, Jerald E.

// The program is important for the following:
// -Data Logic for Login

// Project Started: April 26, 2023
// Project Ended: TBA
// Program Revised: June 16, 2023


//fixed bug no role and position values
//fixed "Trying to access array offset on value of type null in"
class User
{
    private $db;
    private $db_table = "users";
    public $id;
    public $name;
    public $email;
    public $password;
    public $position;
    public $role;

    public function __construct($db)
    {
        $this->db = $db;
    }

    public function authenticateUser()
    {
        $sqlQuery = 
            "SELECT id, name, email, password, position, role FROM "
            . $this->db_table .
            " WHERE email = '"
            . $this->email . 
            "' AND password = '"
            . $this->password . 
            "'";

        $record = $this->db->query($sqlQuery);
        $dataRow = $record->fetch_assoc();
        if(!empty($dataRow))
        {
            $this->id = $dataRow['id'];
            $this->name = $dataRow['name'];
            $this->email = $dataRow['email'];
            $this->designation = $dataRow['password'];
            $this->position = $dataRow['position'];
            $this->role = $dataRow['role'];
        }
    }
}
?>