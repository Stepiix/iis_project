<?php
declare(strict_types=1);

include '../database.php';

/** @var PDO $db */

try {
    if (isset($_GET['subject_code'])) {
        $sbj = $_GET['subject_code'];
        $sql = "SELECT User.user_firstname, User.user_lastname, User.user_id
                FROM User
                JOIN Subject_Teacher ON User.user_id = Subject_Teacher.user_id
                JOIN Subject ON Subject_Teacher.subject_code = Subject.subject_code
                WHERE Subject.subject_code = ?";
 
        $stmt = $db->prepare($sql);
        $stmt->execute([$sbj]);
  
        $teachers = $stmt->fetchAll(PDO::FETCH_ASSOC);
      
        echo json_encode(array("records" => $teachers));
    } else {
        http_response_code(400);
        echo json_encode(array("message" => "Missing 'id' parameter in the request."));
    }

    http_response_code(200);
    header("Content-Type: application/json");
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(array("message" => "Nepodařilo se načíst uživatele.", "error" => $e->getMessage()));
}
