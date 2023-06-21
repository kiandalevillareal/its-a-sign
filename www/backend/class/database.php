<?php
// Project: It's A Sign Application
// Dev: Casulla, Jerald E.
// Project Started: June 12, 2023
// Project Ended: TBA
class Database {
	public $db;
	public function getConnection(){
	$this->db = null;
	
	try{
		$this->db = new mysqli(
			'localhost',
			'id20944386_admin',
			'Adminadmin1!',
			'id20944386_mobile_dev_062023');
	}catch(Exception $e){
		echo "Database could not be connected: " . $e->getMessage();
	}
		return $this->db;
	}
}
?>