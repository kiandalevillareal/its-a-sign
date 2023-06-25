<?php
// Project: It's A Sign Application
// Dev: Casulla, Jerald E.
// Project Started: June 12, 2023
// Project Ended: TBA
class User
{
    private $db;
    public $username;

    public function __construct($db)
    {
        $this->db = $db;
    } 

    public function createUser()
    {
        $this->username = htmlspecialchars(strip_tags($this->username));

        $query = "INSERT INTO users SET username = '".$this->username."'";

        $this->db->query($query);

        if($this->db->affected_rows > 0) return true;
        else return false;
    }


    public function checkUser()
    {
        $this->username = htmlspecialchars(strip_tags($this->username));
        
        $query = "SELECT * FROM users WHERE username = '".$this->username."'";

        $record = $this->db->query($query);

        if ($record->num_rows >= 1) return true;
        else  return false;
    }
}
?>