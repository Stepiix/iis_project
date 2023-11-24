<?php

declare(strict_types=1);

include '../database.php';

/** @var PDO $db */

$activity = json_decode(file_get_contents("php://input"));


if (isset($activity)) {

  $sql = "INSERT INTO Activity (activity_type, activity_length, activity_week, activity_subject_code, activity_teacher) VALUES (?, ?, ?, ?, ?)";
//INSERT INTO Activity (activity_type, activity_length, activity_week, activity_subject_code, activity_teacher) VALUES ('neco', 2, 'sudy', 'SITE', 83)
  $stmt = $db->prepare($sql);

  $stmt->execute([$activity->type, $activity->length, $activity->week, "SITE", $activity->activity_teacher]);
}

$response = array("message" => "Aktivita vytvorena");

http_response_code(200);
header("Content-Type: application/json");

echo json_encode($response);