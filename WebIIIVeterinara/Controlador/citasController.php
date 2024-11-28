<?php
header("Access-Control-Allow-Origin: *"); // Permitir solicitudes de cualquier origen
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS"); // Métodos HTTP permitidos
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Encabezados permitidos
require_once '../Modelos/Citas.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$citas = new Citas();

$accion = $_GET['accion'] ?? null;

if ($accion === 'listar') {
    echo json_encode($citas->listar());
} elseif ($accion === 'insertar') {
    $data = json_decode(file_get_contents("php://input"), true);
    $citas->insertar($data['id_mascota'], $data['fecha'], $data['hora'], $data['descripcion']);
    echo json_encode(["mensaje" => "Cita insertada con éxito."]);
} elseif ($accion === 'actualizar') {
    $data = json_decode(file_get_contents("php://input"), true);
    $citas->actualizar($data['id'], $data['fecha'], $data['hora'], $data['descripcion']);
    echo json_encode(["mensaje" => "Cita actualizada con éxito."]);
} elseif ($accion === 'eliminar') {
    $id = $_GET['id'];
    $citas->eliminar($id);
    echo json_encode(["mensaje" => "Cita eliminada con éxito."]);
} elseif ($accion === 'buscar') {
    $id = $_GET['id'];
    echo json_encode($citas->buscar($id));
}
?>

