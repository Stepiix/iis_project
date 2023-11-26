<?php

declare(strict_types=1);

include '../database.php';

/** @var PDO $db */

if (isset($_GET['subject_code'])) {
  $subject_code = $_GET['subject_code'];

  $sql = "DELETE FROM Subject WHERE subject_code = ?";
  $stmt = $db->prepare($sql);

  if ($stmt->execute([$subject_code])) {
    http_response_code(200);
    echo json_encode(array("message" => "Predmet byl smazan"));
  } else {
    http_response_code(500);
    echo json_encode(array("message" => "Nelze smazat predmet"));
  }
} else {
  http_response_code(400);
  echo json_encode(array("message" => "Chybi kod predmetu"));
}