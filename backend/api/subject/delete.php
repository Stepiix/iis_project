<?php

declare(strict_types=1);

include '../database.php';

/** @var PDO $db */

// Zkontrolujte, zda byl předán identifikátor uživatele v GET požadavku
if (isset($_GET['subject_code'])) {
  $subject_code = $_GET['subject_code'];

  // Smažte uživatele s předaným identifikátorem
  $sql = "DELETE FROM Subject WHERE subject_code = ?";
  $stmt = $db->prepare($sql);

  if ($stmt->execute([$subject_code])) {
    // Uživatel byl úspěšně smazán
    http_response_code(200);
    echo json_encode(array("message" => "Predmet byl smazan"));
  } else {
    // Pokud došlo k chybě při mazání
    http_response_code(500);
    echo json_encode(array("message" => "Nelze smazat predmet"));
  }
} else {
  // Pokud nebyl předán identifikátor uživatele
  http_response_code(400);
  echo json_encode(array("message" => "Chybi kod predmetu"));