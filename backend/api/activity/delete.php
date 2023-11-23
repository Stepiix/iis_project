<?php

declare(strict_types=1);

include '../database.php';

/** @var PDO $db */


if (isset($_GET['activity_id'])) {
  $activity_id = $_GET['activity_id'];

  $sql = "DELETE FROM Activity WHERE activity_id = ?";
  $stmt = $db->prepare($sql);

  if ($stmt->execute([$activity_id])) {
    http_response_code(200);
    echo json_encode(array("message" => "Aktivita smazana"));
  } else {
    http_response_code(500);
    echo json_encode(array("message" => "Aktivitu nejde smazat"));
  }
} else {
  http_response_code(400);
  echo json_encode(array("message" => "Chybi kod mistnosti"));
}