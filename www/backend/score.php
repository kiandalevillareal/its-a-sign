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
    public $sentence;
    public $score_id;
    

    public function __construct($db)
    {
        $this->db = $db;
    } 

    public function addScore()
    {
        $this->user_id = htmlspecialchars(strip_tags($this->user_id));
        $this->difficulty = htmlspecialchars(strip_tags($this->difficulty));
        $this->score = htmlspecialchars(strip_tags($this->score));
        $this->sentence = htmlspecialchars(strip_tags($this->sentence));

        $query = "INSERT INTO scores SET 
        user_id = ".$this->user_id.",
        difficulty = '".$this->difficulty."',
        score = ".$this->score.",
        sentence = '".$this->sentence."'";

        $this->db->query($query);

        if($this->db->affected_rows > 0) return true;
        else return false;
    }
    public function getLeaderboard()
    {
        $this->difficulty = htmlspecialchars(strip_tags($this->difficulty));
        $this->score_id = htmlspecialchars(strip_tags($this->score_id));
        
// SELECT s.user_id, s.score_id, s.score, s.sentence
// FROM scores AS s
// JOIN users AS u ON s.user_id = u.user_id
// JOIN (
//   SELECT user_id, MAX(score) AS max_score
//   FROM scores
//   WHERE difficulty = 'easy'
//   GROUP BY user_id
// ) AS max_scores ON s.user_id = max_scores.user_id AND s.score = max_scores.max_score
// WHERE s.difficulty = 'easy'
// GROUP BY s.user_id
// ORDER BY s.score DESC

// SELECT s.user_id, s.score_id, s.score, s.sentence
// FROM scores AS s
// JOIN users AS u ON s.user_id = u.user_id
// JOIN (
//   SELECT user_id, MAX(score) AS max_score
//   FROM scores
//   WHERE difficulty = 'easy'
//   GROUP BY user_id
// ) AS max_scores ON s.user_id = max_scores.user_id AND s.score = max_scores.max_score
// WHERE s.difficulty = 'easy'
//   AND s.score < 300
//   AND s.user_id = 8
// GROUP BY s.user_id
// ORDER BY s.score DESC

        $topScoresQuery = 
            "SELECT  ROW_NUMBER() OVER (ORDER BY s.score DESC) AS position,
            s.user_id, username, s.score_id, s.score, s.sentence
            FROM scores AS s
            JOIN users AS u ON s.user_id = u.user_id
            JOIN (
              SELECT user_id, MAX(score) AS max_score
              FROM scores
              WHERE difficulty = '".$this->difficulty."'
              GROUP BY user_id
            ) AS max_scores ON s.user_id = max_scores.user_id AND s.score = max_scores.max_score
            WHERE s.difficulty = '".$this->difficulty."'
            GROUP BY s.user_id
            ORDER BY s.score DESC";

        $UserScoreQuery = 
            "SELECT  ROW_NUMBER() OVER (ORDER BY s.score DESC) AS position,
            s.user_id, username, s.score_id, s.score, s.sentence
            FROM scores AS s
            JOIN users AS u ON s.user_id = u.user_id
            JOIN (
              SELECT user_id, MAX(score) AS max_score
              FROM scores
              WHERE difficulty = '".$this->difficulty."'
              GROUP BY user_id
            ) AS max_scores ON s.user_id = max_scores.user_id AND s.score = max_scores.max_score
            WHERE s.difficulty = '".$this->difficulty."'
            AND s.user_id = '".$this->user_id."'
            GROUP BY s.user_id
            ORDER BY s.score DESC";

        $result = $this->db->query($topScoresQuery);
        $result2 = $this->db->query($UserScoreQuery);
        // $userPosition = ($result2->num_rows > 0) ? ($result2->fetch_assoc())['position'] + 1 : null;


        if ($result->num_rows > 0) {
            // Process and return the top scores as JSON
            $topScores = [];
            $position = 1; // Initialize position counter
    
            for ($position = 1; $position <= 3 && $row = $result->fetch_assoc(); $position++) {
                // Create a new row with position and other data
                $newRow = [
                    'position' => $row['position'],
                    'user_id' => $row['user_id'],
                    'username' => $row['username'],
                    'score_id' => $row['score_id'],
                    'score' => $row['score'],
                    'sentence' => $row['sentence']
                ];
            
                $topScores[] = $newRow;
            }
           while ($row = $result2->fetch_assoc()) {
                // Create a new row with position and other data
                $newRow = [
                    'position' => $row['position'],
                    'user_id' => $row['user_id'],
                    'username' => $row['username'],
                    'score_id' => $row['score_id'],
                    'score' => $row['score'],
                    'sentence' => $row['sentence']
                ];
        
                $topScores[] = $newRow;
            }
            return $topScores;
        } else {
            return "Leaderboard not retrieved.";
        }
    }
    
}
?>