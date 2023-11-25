<?php

declare(strict_types=1);

include '../database.php';

/** @var PDO $db */

$subject = json_decode(file_get_contents("php://input"));


if (isset($subject)) {


    $sql = "UPDATE Subject
        SET activity_type = ?,
        activity_length = ?,
        activity_week = ?,
        activity_subject_code = ?
        WHERE activity_id = ?";

    $stmt = $db->prepare($sql);

    $stmt->execute([$subject->type, $subject->length, $subject->week, $subject->subject_code, $subject->id]);
}

$response = array("message" => "aktivita byla upravena");
http_response_code(200);
header("Content-Type: application/json");