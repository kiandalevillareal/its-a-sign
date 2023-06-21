<?php
// Project: It's A Sign Application
// Dev: Casulla, Jerald E.
// Project Started: June 12, 2023
// Project Ended: TBA
class User
{
    private $db;
    private $db_table = "users";
    public $username;

    public function __construct($db)
    {
        $this->db = $db;
    } 

    public function createUser()
    {
        $this->username = htmlspecialchars(strip_tags($this->name));
        $sqlQuery = 
            "INSERT INTO". $this->db_table .
            " SET username = '".$this->name."'";
        $this->db->query($sqlQuery);
        if($this->db->affected_rows > 0)
        {
            return true;
        }
            return false;
    }
}
?>