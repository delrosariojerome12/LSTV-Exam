<?php
require_once 'db_connect.php';

// Check if the request method is PUT
if ($_SERVER["REQUEST_METHOD"] === "PUT") {
    // Retrieve JSON data from the request body
    $data = json_decode(file_get_contents("php://input"), true);

    // Extract data
    $recId = $data["recid"]; // Assuming you send the recid to be edited
    $columnName = $data["column"]; // Name of the column to be edited
    $newValue = $data["value"]; // New value to be set

    // Update employee column in the employeefile table
    $updateSql = "UPDATE employeefile SET $columnName = ? WHERE recid = ?";
    $stmtUpdate = $conn->prepare($updateSql);
    $stmtUpdate->bind_param("si", $newValue, $recId);

    if ($stmtUpdate->execute()) {
        // Fetch the updated employee
        $selectSql = "SELECT * FROM employeefile WHERE recid = ?";
        $stmtSelect = $conn->prepare($selectSql);
        $stmtSelect->bind_param("i", $recId);
        $stmtSelect->execute();
        $result = $stmtSelect->get_result();

        if ($result->num_rows === 1) {
            $employee = $result->fetch_assoc();
            echo json_encode($employee);
        } else {
            http_response_code(404);
            echo json_encode(array("message" => "Employee not found."));
        }
        $stmtSelect->close();
    } else {
        http_response_code(500);
        echo json_encode(array("message" => "Error updating employee column: " . $stmtUpdate->error));
    }

    $stmtUpdate->close();
    $conn->close();
}
?>
