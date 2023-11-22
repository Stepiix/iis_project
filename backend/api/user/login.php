<?php


declare(strict_types=1);

include '../database.php';

/** @var TYPE_NAME $db */
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Max-Age: 3600");


$user = json_decode(file_get_contents("php://input"));

if (isset($user)) {
    
    
    
    $login = $user->email;
    $password = $user->password;
    
    
    //now we should find the email in databaze
    
    // $sql = "SELECT User.user_password FROM User WHERE User.user_email=?";
    $sql = "SELECT User.user_password, User.user_role, User.user_id FROM User WHERE User.user_email=?";
    
    $stmt = $db->prepare($sql);
    
    $stmt->execute([$user->email]);
    $data = $stmt->fetch();

    if ($data && password_verify($password, $data['user_password'])) {
        // Přihlášení bylo úspěšné
        
        // Vrátit úspěch a roli uživatele
        $response = array(
            "message" => "Login successful",
            "userRole" => $data['user_role'],
            "userID" => $data['user_id']
        );
        http_response_code(200); // OK
        header("Content-Type: application/json");
    } else {
        // Chyba přihlášení
        $response = array("message" => "Invalid Email or Password");
        http_response_code(401); // Unauthorized
        header("Content-Type: application/json");
    }
    echo json_encode($response);

    
}

        

    // if(password_verify($password, $data['user_password']) == TRUE){
    //     //zahajeni session 
    //     http_response_code(200); // Unauthorized

    // }else{
    //     http_response_code(401); // Unauthorized
        
    // }
    // header("Content-Type: application/json");
    // echo json_encode($debug);
    

//else {
//     http_response_code(400);
//     echo json_encode(array("message" => "Chybí identifikátor uživatele"));
// }

