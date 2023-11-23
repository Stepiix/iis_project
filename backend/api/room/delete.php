<?php

declare(strict_types=1);

include '../database.php';

/** @var PDO $db */

// Zkontrolujte, zda byl předán identifikátor uživatele v GET požadavku
if (isset($_GET['code'])) {
  $room_code = $_GET['code'];

  // Smažte uživatele s předaným identifikátorem
  $sql = "DELETE FROM Room WHERE room_code = ?";
  $stmt = $db->prepare($sql);

  if ($stmt->execute([$room_code])) {
    // Uživatel byl úspěšně smazán
    http_response_code(200);
    echo json_encode(array("message" => "Místnost byla smazána"));
  } else {
    // Pokud došlo k chybě při mazání
    http_response_code(500);
    echo json_encode(array("message" => "Nelze smazat místnost"));
  }
} else {
  // Pokud nebyl předán identifikátor uživatele
  http_response_code(400);
  echo json_encode(array("message" => "Chybí kód místnosti"));
}