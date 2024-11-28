<?php
class Conexion {
    private $host = "sql201.infinityfree.com:3306";
    private $dbname = "if0_37800640_veterinaria2";
    private $username = "if0_37800640";
    private $password = "bEM5MaQA4nhV";
    public $conn;

    public function __construct() {
        try {
            $this->conn = new PDO("mysql:host=$this->host;dbname=$this->dbname", $this->username, $this->password);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            echo "Error en la conexión: " . $e->getMessage();
        }
    }
}
?>
