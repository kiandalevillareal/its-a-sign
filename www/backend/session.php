<?php
// Project: It's A Sign Application
// Dev: Casulla, Jerald E.
// Project Started: June 12, 2023
// Project Ended: TBA
class Session
{
    private $db;
    public $session_id;
    public $user_id;
    public $difficulty;
    public $score;
    public $word;

    public function __construct($db)
    {
        $this->db = $db;
    } 

    public function addSession()
    {
        $this->user_id = htmlspecialchars(strip_tags($this->user_id));

        $query = "INSERT INTO sessions SET 
        user_id = ".$this->user_id;

        $this->db->query($query);

        if($this->db->affected_rows > 0) return true;
        else return false;
    }

    public function endSession()
    {
        $this->user_id = htmlspecialchars(strip_tags($this->user_id));

        $query = "UPDATE sessions SET 
        session_ended = CURRENT_TIMESTAMP
        where session_id = ".$this->session_id;

        $this->db->query($query);

        if($this->db->affected_rows > 0) return true;
        else return false;
    }
}
?>