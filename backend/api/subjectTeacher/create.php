<?php

declare(strict_types=1);

include '../database.php';

/** @var PDO $db */

$subTeach = json_decode(file_get_contents("php://input"));


if (isset($subTeach)) {

  $sql = "INSERT INTO Subject_Teacher (subject_code, user_id) VALUES (?, ?)";

  $stmt = $db->prepare($sql);

  $stmt->execute([$subTeach->subject_code, $subTeach->user_id]);
}

$response = array("message" => "Predmet prirazen uciteli");

http_response_code(200);
header("Content-Type: application/json");

echo json_encode($response);