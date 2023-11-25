<?php

declare(strict_types=1);

include '../database.php';

/** @var PDO $db */

$subStud = json_decode(file_get_contents("php://input"));


if (isset($subStud)) {

  $sql = "INSERT INTO Subject_Student (subject_code, user_id) VALUES (?, ?)";

  $stmt = $db->prepare($sql);

  $stmt->execute([$subStud->subject_code, $subStud->user_id]);
}

$response = array("message" => "Predmet prirazen uciteli");

http_response_code(200);
header("Content-Type: application/json");

echo json_encode($response);