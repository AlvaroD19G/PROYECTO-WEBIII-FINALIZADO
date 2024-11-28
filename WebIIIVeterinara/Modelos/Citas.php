<?php
require_once '../Configuracion/conexion.php';

class Citas
{
    private $conn;

    public function __construct()
    {
        $this->conn = (new Conexion())->conn;
    }

    public function listar()
    {
        $sql = "SELECT c.id, m.nombre AS mascota, c.fecha, c.hora, c.descripcion 
                FROM citas c
                JOIN mascotas m ON c.id_mascota = m.id";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function existeCita($id_mascota, $fecha, $hora)
    {
        $sql = "SELECT * FROM citas WHERE id_mascota = ? AND fecha = ? AND hora = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([$id_mascota, $fecha, $hora]);
        return $stmt->fetch(PDO::FETCH_ASSOC) !== false;
    }

    public function insertar($id_mascota, $fecha, $hora, $descripcion)
    {
        
        $fechaActual = date('Y-m-d'); 
        if ($fecha < $fechaActual) {
            throw new Exception("No se pueden agendar citas en una fecha anterior a la actual.");
        }

        if ($this->existeCita($id_mascota, $fecha, $hora)) {
            throw new Exception("Ya existe una cita para esta mascota en la fecha y hora especificadas.");
        }

        $sql = "INSERT INTO citas (id_mascota, fecha, hora, descripcion) VALUES (?, ?, ?, ?)";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([$id_mascota, $fecha, $hora, $descripcion]);
    }


    public function actualizar($id, $fecha, $hora, $descripcion)
    {
        $sql = "UPDATE citas SET fecha = ?, hora = ?, descripcion = ? WHERE id = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([$fecha, $hora, $descripcion, $id]);
    }

    public function eliminar($id)
    {
        $sql = "DELETE FROM citas WHERE id = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([$id]);
    }

    public function buscar($id)
    {
        $sql = "SELECT c.id, m.nombre AS mascota, c.fecha, c.hora, c.descripcion 
                FROM citas c
                JOIN mascotas m ON c.id_mascota = m.id
                WHERE c.id = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}
