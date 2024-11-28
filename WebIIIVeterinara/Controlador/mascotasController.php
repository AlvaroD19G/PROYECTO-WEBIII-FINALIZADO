<?php
header("Access-Control-Allow-Origin: *"); // Permitir solicitudes de cualquier origen
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS"); // Métodos HTTP permitidos
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Encabezados permitidos
require_once '../Modelos/Mascotas.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$mascotas = new Mascotas();

$accion = $_GET['accion'] ?? null;

if ($accion === 'listar') {
    echo json_encode($mascotas->listar());
} elseif ($accion === 'insertar') {
    $data = json_decode(file_get_contents("php://input"), true);
    $mascotas->insertar($data['nombre'], $data['raza'], $data['edad'], $data['id_usuario']);
    echo json_encode(["mensaje" => "Mascota insertada con éxito."]);
} elseif ($accion === 'actualizar') {
    $data = json_decode(file_get_contents("php://input"), true);
    $mascotas->actualizar($data['id'], $data['nombre'], $data['raza'], $data['edad']);
    echo json_encode(["mensaje" => "Mascota actualizada con éxito."]);
} elseif ($accion === 'eliminar') {
    $id = $_GET['id'];
    $mascotas->eliminar($id);
    echo json_encode(["mensaje" => "Mascota eliminada con éxito."]);
} elseif ($accion === 'buscar') {
    $id = $_GET['id'];
    echo json_encode($mascotas->buscar($id));
}
?>
