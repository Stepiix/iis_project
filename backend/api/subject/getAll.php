<?php
declare(strict_types=1);

include '../database.php';

/** @var PDO $db */

try {
  $sql = "SELECT subject_code, subject_name, subject_annotation, subject_guarantor FROM Subject";
  $stmt = $db->prepare($sql);
  $stmt->execute();

  $subjects = $stmt->fetchAll(PDO::FETCH_ASSOC);

  http_response_code(200);
  header("Content-Type: application/json");

  echo json_encode(array("records" => $subjects));
} catch (PDOException $e) {
  http_response_code(500);
  echo json_encode(array("message" => "Nepodařilo se načíst místnosti.", "error" => $e->getMessage()));
}