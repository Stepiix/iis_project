<?php
declare(strict_types=1);

include '../database.php';

/** @var PDO $db */

try {
  $sql = "SELECT activity_id, activity_type, activity_length, activity_week, activity_subject_code FROM Activity";
  $stmt = $db->prepare($sql);
  $stmt->execute();

  $activities = $stmt->fetchAll(PDO::FETCH_ASSOC);

  http_response_code(200);
  header("Content-Type: application/json");

  echo json_encode(array("records" => $activities));
} catch (PDOException $e) {
  http_response_code(500);
  echo json_encode(array("message" => "Nepodarilo se nacist aktivity", "error" => $e->getMessage()));
}