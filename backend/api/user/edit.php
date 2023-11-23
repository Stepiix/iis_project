<?php

declare(strict_types=1);

include '../database.php';

/** @var PDO $db */

$user = json_decode(file_get_contents("php://input"));

if (
    !isset($user->user_id) ||
    !isset($user->user_firstname) ||
    !isset($user->user_lastname) ||
    !isset($user->user_email) ||
    !isset($user->user_role)
) {
    http_response_code(400); // Bad Request
    echo json_encode(array("message" => "Invalid user data"));
    exit();
}

// Update user in the database
$query = "UPDATE User SET user_firstname = :firstname, user_lastname = :lastname, user_email = :email, user_role = :role WHERE user_id = :user_id";
$stmt = $db->prepare($query);

$stmt->bindParam(':firstname', $user->user_firstname);
$stmt->bindParam(':lastname', $user->user_lastname);
$stmt->bindParam(':email', $user->user_email);
$stmt->bindParam(':role', $user->user_role);
$stmt->bindParam(':user_id', $user->user_id);

if ($stmt->execute()) {
    http_response_code(200); // OK
    echo json_encode(array("message" => "User was updated."));
} else {
    http_response_code(500); // Internal Server Error
    echo json_encode(array("message" => "Unable to update user."));
}