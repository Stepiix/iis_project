<?php

declare(strict_types=1);

include '../database.php';

/** @var PDO $db */

$subject = json_decode(file_get_contents("php://input"));


if (isset($subject)) {

  $sql = "INSERT INTO Subject (subject_code, subject_name, subject_annotation, subject_guarantor) VALUES (?, ?, ?, ?)";

  $stmt = $db->prepare($sql);

  $stmt->execute([$subject->code, $subject->name, $subject->annotation, $subject->guarantor]);
}

$response = array("message" => "Predmet vytvoren");

http_response_code(200);
header("Content-Type: application/json");

echo json_encode($response);