<?php

declare(strict_types=1);

include '../database.php';

/** @var PDO $db */

$room = json_decode(file_get_contents("php://input"));


if (isset($room)) {


    $sql = "UPDATE Room
        SET room_capacity = ?
        WHERE room_code = ?";

    $stmt = $db->prepare($sql);

    $stmt->execute([$room->capacity, $room->code]);
}

$response = array("message" => "Mistnost upravena");
http_response_code(200);
header("Content-Type: application/json");