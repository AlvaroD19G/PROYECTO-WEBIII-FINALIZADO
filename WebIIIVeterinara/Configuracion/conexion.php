<?php
class Conexion {
    private $host = "mascotas.mysql.database.azure.com";
    private $dbname = "veterinaria";
    private $username = "adminuser@mascotas";
    private $password = "Admin123!";
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
