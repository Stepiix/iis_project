<?php
declare(strict_types=1);

include '../database.php';

/** @var PDO $db */

$garant = json_decode(file_get_contents("php://input"));

try {
  if (isset($garant)) {


    $sql = "SELECT subject_code, subject_name, subject_annotation, subject_guarantor FROM Subject
            WHERE subject_guarantor = ?";
 
   $stmt = $db->prepare($sql);
   $stmt->execute();
  
    $subjects = $stmt->fetchAll(PDO::FETCH_ASSOC);
      
    echo json_encode(array("records" => $subjects));
  }

  http_response_code(200);
  header("Content-Type: application/json");
  
} catch (PDOException $e) {
  http_response_code(500);
  echo json_encode(array("message" => "Nepodařilo se načíst uživatele.", "error" => $e->getMessage()));
}
