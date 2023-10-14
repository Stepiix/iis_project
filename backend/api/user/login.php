<?php

declare(strict_types=1);

include '../database.php';

/** @var TYPE_NAME $db */


$user = json_decode(file_get_contents("php://input"));


if (isset($user)) {
    
    
    
    $login = $user->email;
    $password = $user->password;
    
    
    //now we should find the email in databaze
    
    $sql = "SELECT User.user_password FROM User WHERE User.user_email=?";
    
    $stmt = $db->prepare($sql);
    
    $stmt->execute([$user->email]);
    $data = $stmt->fetch();


    if(password_verify($password, $data['user_password']) == TRUE){
        //zahajeni session 

        $_SESSION['user'] = $login;
//        echo "<p>Vitej uzivateli $login</p>";
        $debug = array("message" => "Password Correct");
        header("Content-Type: application/json");
        echo json_encode($debug);

    }else{
        
        $debug = array("message" => "Invalid Password");
        header("Content-Type: application/json");
        echo json_encode($debug);

    }
    
} 
//else {
//     http_response_code(400);
//     echo json_encode(array("message" => "Chybí identifikátor uživatele"));
// }

