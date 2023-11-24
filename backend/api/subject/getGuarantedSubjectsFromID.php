<?php
declare(strict_types=1);

include '../database.php';

/** @var PDO $db */

try {
    // Check if 'id' parameter is set in the GET request
    if (isset($_GET['id'])) {
        $garant = $_GET['id'];
        $sql = "SELECT subject_code, subject_name, subject_annotation, subject_guarantor FROM Subject WHERE subject_guarantor = ?";
 
        $stmt = $db->prepare($sql);
        $stmt->execute([$garant]);
  
        $subjects = $stmt->fetchAll(PDO::FETCH_ASSOC);
      
        echo json_encode(array("records" => $subjects));
    } else {
        // If 'id' parameter is not set, return a response indicating the issue
        http_response_code(400);
        echo json_encode(array("message" => "Missing 'id' parameter in the request."));
    }

    http_response_code(200);
    header("Content-Type: application/json");
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(array("message" => "Nepodařilo se načíst uživatele.", "error" => $e->getMessage()));
}
