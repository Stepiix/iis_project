<?php
declare(strict_types=1);

include '../database.php';

/** @var PDO $db */

try {
  $sql = "SELECT * FROM A_Block";
  $stmt = $db->prepare($sql);
  $stmt->execute();

  $a_blocks = $stmt->fetchAll(PDO::FETCH_ASSOC);

  http_response_code(200);
  header("Content-Type: application/json");

  echo json_encode(array("records" => $a_blocks));
} catch (PDOException $e) {
  http_response_code(500);
  echo json_encode(array("message" => "Nepodarilo se nacist aktivity", "error" => $e->getMessage()));
}