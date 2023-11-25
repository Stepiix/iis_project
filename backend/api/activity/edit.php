<?php

declare(strict_types=1);

include '../database.php';

/** @var PDO $db */

$act = json_decode(file_get_contents("php://input"));


if (isset($act)) {


    $sql = "UPDATE Activity
        SET activity_type = ?,
        activity_length = ?,
        activity_week = ?,
        activity_subject_code = ?
        WHERE activity_id = ?";

    $stmt = $db->prepare($sql);

    $stmt->execute([$act->type, $act->length, $act->week, $act->subject_code, $act->id]);
}

$response = array("message" => "aktivita byla upravena");
http_response_code(200);
header("Content-Type: application/json");