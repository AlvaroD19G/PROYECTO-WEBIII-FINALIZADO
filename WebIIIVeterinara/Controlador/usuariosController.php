<?php
header("Access-Control-Allow-Origin: *"); // Permitir solicitudes de cualquier origen
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS"); // Métodos HTTP permitidos
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Encabezados permitidos
require_once '../Modelos/Usuarios.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$usuarios = new Usuarios();

$accion = $_GET['accion'] ?? null;

if ($accion === 'listar') {
    echo json_encode($usuarios->listar());
} elseif ($accion === 'insertar') {
    $data = json_decode(file_get_contents("php://input"), true);
    $usuarios->insertar($data['nombre'], $data['telefono'], $data['direccion']);
    echo json_encode(["mensaje" => "usuario insertado con éxito."]);
} elseif ($accion === 'actualizar') {
    $data = json_decode(file_get_contents("php://input"), true);
    $usuarios->actualizar($data['id'], $data['nombre'], $data['telefono'], $data['direccion']);
    echo json_encode(["mensaje" => "usuario actualizado con éxito."]);
} elseif ($accion === 'eliminar') {
    $id = $_GET['id'];
    $usuarios->eliminar($id);
} elseif ($accion === 'buscar') {
    $id = $_GET['id'];
    echo json_encode($usuarios->buscar($id));
}
?>
