<?php

declare(strict_types=1);

include '../database.php';

/** @var PDO $db */

$subject = json_decode(file_get_contents("php://input"));


if (isset($subject)) {


    $sql = "UPDATE Subject
        SET subject_name = ?,
            subject_annotation = ?,
            subject_guarantor = ?
        WHERE subject_code = ?";

    $stmt = $db->prepare($sql);

    $stmt->execute([$subject->name, $subject->annotation, $subject->guarantor, $subject->code]);
}

$response = array("message" => "Predmet upraven");
http_response_code(200);
header("Content-Type: application/json");