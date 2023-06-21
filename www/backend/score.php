<?php
// Project: It's A Sign Application
// Dev: Casulla, Jerald E.
// Project Started: June 12, 2023
// Project Ended: TBA
class Score
{
    private $db;
    public $user_id;
    public $difficulty;
    public $score;
    public $word;

    public function __construct($db)
    {
        $this->db = $db;
    } 

    public function addScore()
    {
        $this->user_id = htmlspecialchars(strip_tags($this->user_id));
        $this->difficulty = htmlspecialchars(strip_tags($this->difficulty));
        $this->score = htmlspecialchars(strip_tags($this->score));
        $this->word = htmlspecialchars(strip_tags($this->word));

        $query = "INSERT INTO scores SET 
        user_id = ".$this->user_id.",
        difficulty = '".$this->difficulty."',
        score = ".$this->score.",
        word = '".$this->word."'";

        $this->db->query($query);

        if($this->db->affected_rows > 0) return true;
        else return false;
    }
}
?>