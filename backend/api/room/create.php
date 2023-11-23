<?php

declare(strict_types=1);

include '../database.php';

/** @var PDO $db */

$room = json_decode(file_get_contents("php://input"));


if (isset($room)) {

  $sql = "INSERT INTO Room (room_code, room_capacity) VALUES (?, ?)";

  $stmt = $db->prepare($sql);

  $stmt->execute([$room->code, $room->capacity]);
}

$response = array("message" => "Místnost vytvořena");

http_response_code(200);
header("Content-Type: application/json");

//echo json_encode($response);