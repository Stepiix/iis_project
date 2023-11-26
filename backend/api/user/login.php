<?php


declare(strict_types=1);

include '../database.php';

/** @var TYPE_NAME $db */


$user = json_decode(file_get_contents("php://input"));

if (isset($user)) {
    
    
    
    $login = $user->email;
    $password = $user->password;
    

    $sql = "SELECT User.user_password, User.user_role, User.user_id FROM User WHERE User.user_email=?";
    
    $stmt = $db->prepare($sql);
    
    $stmt->execute([$user->email]);
    $data = $stmt->fetch();

    if ($data && password_verify($password, $data['user_password'])) {

        $response = array(
            "message" => "Login successful",
            "userRole" => $data['user_role'],
            "userID" => $data['user_id']
        );
        http_response_code(200);
        header("Content-Type: application/json");
    } else {
        $response = array("message" => "Invalid Email or Password");
        http_response_code(401);
        header("Content-Type: application/json");
    }
    echo json_encode($response);

    
}

    