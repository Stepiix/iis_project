<?php

declare(strict_types=1);

include '../database.php';

/** @var PDO $db */

$act = json_decode(file_get_contents("php://input"));


if (isset($act)) {


    $sql = "UPDATE A_Block
        SET a_block_confirmed = 1,
        a_block_room_code = ?,
        WHERE a_block_id = ?";

    $stmt = $db->prepare($sql);

    $stmt->execute([$act->a_block_room_code, $act->a_block_id]);
}

$response = array("message" => "aktivita byla upravena");
http_response_code(200);
header("Content-Type: application/json");