<?php

declare(strict_types=1);

include '../database.php';

/** @var PDO $db */

if (isset($_GET['room_code'])) {
  $room_code = $_GET['room_code'];


  $sql = "DELETE FROM Room WHERE room_code = ?";
  $stmt = $db->prepare($sql);

  if ($stmt->execute([$room_code])) {
    http_response_code(200);
    echo json_encode(array("message" => "Místnost byla smazána"));
  } else {
    http_response_code(500);
    echo json_encode(array("message" => "Nelze smazat místnost"));
  }
} else {
  http_response_code(400);
  echo json_encode(array("message" => "Chybí kód místnosti"));
}