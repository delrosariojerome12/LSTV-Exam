# LSTV-Exam

This is a web application built using PHP, MySQL, and React Vite for managing employee records.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- [PHP](https://www.php.net/downloads.php) installed on your local machine.
- [MySQL](https://dev.mysql.com/downloads/) or any other compatible relational database management system.
- [Node.js](https://nodejs.org/) installed on your local machine.
- [Git](https://git-scm.com/downloads) for version control.

## Backend Setup

1. Create a new database in MySQL named "employee_db".
2. Import the `database.sql` file provided in the repository to set up the required tables.
3. Update the database connection details in `backend/db_connect.php`. Make sure to set the correct hostname, username, password, and database name.

## Frontend Setup

1. Navigate to the `frontend` directory: `cd frontend`.
2. Install dependencies: `npm install`.

## Running the Application

1. Place the entire folder of this code in the `htdocs` directory of your local server (e.g., XAMPP or WampServer).
2. Start the PHP development server in the `backend` directory: `php -S localhost:8000`.
3. Start the React Vite development server in the `frontend` directory: `npm run dev`.
4. Open your web browser and access `http://localhost:3000` to use the application.
5. Use these credentials to access the system:
   username: 'zero'
   password: '123'

## Note

This project is for educational purposes and does not include a license. Use it responsibly and adhere to all relevant laws and regulations.