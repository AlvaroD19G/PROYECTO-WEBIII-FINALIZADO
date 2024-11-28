<?php
require_once '../Configuracion/conexion.php';

class Mascotas {
    private $conn;

    public function __construct() {
        $this->conn = (new Conexion())->conn;
    }

    public function listar() {
        $sql = "SELECT m.id, m.nombre, m.raza, m.edad, d.nombre AS usuarios 
                FROM mascotas m
                JOIN usuarios d ON m.id_usuario = d.id";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function insertar($nombre, $raza, $edad, $id_usuario) {
        $sql = "INSERT INTO mascotas (nombre, raza, edad, id_usuario) VALUES (?, ?, ?, ?)";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([$nombre, $raza, $edad, $id_usuario]);
    }

    public function actualizar($id, $nombre, $raza, $edad) {
        $sql = "UPDATE mascotas SET nombre = ?, raza = ?, edad = ? WHERE id = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([$nombre, $raza, $edad, $id]);
    }

    public function eliminar($id) {
        $sql = "DELETE FROM mascotas WHERE id = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([$id]);
    }

    public function buscar($id) {
        $sql = "SELECT m.id, m.nombre, m.raza, m.edad, d.nombre AS usuarios 
                FROM mascotas m
                JOIN usuarios d ON m.id_usuario = d.id
                WHERE m.id = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}
?>
