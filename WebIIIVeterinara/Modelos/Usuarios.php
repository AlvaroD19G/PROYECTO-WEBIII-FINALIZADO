<?php
require_once '../Configuracion/conexion.php';

class Usuarios {
    private $conn;

    public function __construct() {
        $this->conn = (new Conexion())->conn;
    }

    public function listar() {
        $sql = "SELECT * FROM usuarios";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function insertar($nombre, $telefono, $direccion) {
        $sql = "INSERT INTO usuarios (nombre, telefono, direccion) VALUES (?, ?, ?)";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([$nombre, $telefono, $direccion]);
    }

    public function actualizar($id, $nombre, $telefono, $direccion) {
        $sql = "UPDATE usuarios SET nombre = ?, telefono = ?, direccion = ? WHERE id = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([$nombre, $telefono, $direccion, $id]);
    }

    public function eliminar($id) {
        // Verificar si el usuario tiene mascotas asociadas
        $sqlCheck = "SELECT COUNT(*) as total FROM mascotas WHERE id_usuario = ?";
        $stmtCheck = $this->conn->prepare($sqlCheck);
        $stmtCheck->execute([$id]);
        $result = $stmtCheck->fetch(PDO::FETCH_ASSOC);
    
        if ($result['total'] > 0) {
            // Retornar mensaje de error en JSON
            echo json_encode([
                'status' => 'error',
                'message' => 'No se puede eliminar este usuario porque tiene mascotas asociadas.'
            ]);
        } else {
            // Eliminar al usuario
            $sqlDelete = "DELETE FROM usuarios WHERE id = ?";
            $stmtDelete = $this->conn->prepare($sqlDelete);
            $stmtDelete->execute([$id]);
    
            // Retornar mensaje de éxito en JSON
            echo json_encode([
                'status' => 'success',
                'message' => 'El usuario ha sido eliminado exitosamente.'
            ]);
        }
    }
    
    

    public function buscar($id) {
        $sql = "SELECT * FROM usuarios WHERE id = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}
?>
