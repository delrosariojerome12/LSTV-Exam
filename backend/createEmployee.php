<?php
require_once 'db_connect.php';

// Check if the request method is POST
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Retrieve JSON data from the request body
    $data = json_decode(file_get_contents("php://input"), true);

    // Extract data
    $fullname = $data["fullname"];
    $gender = $data["gender"];
    $age = $data["age"];
    $birthdate = $data["birthdate"];
    $civilstat = $data["civilstat"];
    $contactnum = $data["contactnum"];
    $salary = $data["salary"];
    $isactive = $data["isactive"];

    // Insert data into the employeefile table
    $sql = "INSERT INTO employeefile (fullname, gender, age, birthdate, civilstat, contactnum, salary, isactive) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssisssdi", $fullname, $gender, $age, $birthdate, $civilstat, $contactnum, $salary, $isactive);

    if ($stmt->execute()) {
        echo json_encode(array("message" => "Employee entry created successfully."));
    } else {
        http_response_code(500);
        echo json_encode(array("message" => "Error creating employee entry: " . $stmt->error));
    }

    $stmt->close();
    $conn->close();
}
?>
