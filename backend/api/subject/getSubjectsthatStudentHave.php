<?php
declare(strict_types=1);

include '../database.php';

/** @var PDO $db */

try {
    // Check if 'id' parameter is set in the GET request
    if (isset($_GET['user_id'])) {
        $sbj = $_GET['user_id'];
        $sql = "SELECT Subject.subject_code, Subject.subject_name, Subject.subject_annotation
                FROM Subject_Student
                JOIN Subject ON Subject_Student.subject_code = Subject.subject_code
                WHERE Subject_Student.user_id = ?";
 
        $stmt = $db->prepare($sql);
        $stmt->execute([$sbj]);
  
        $students = $stmt->fetchAll(PDO::FETCH_ASSOC);
      
        echo json_encode(array("records" => $students));
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
