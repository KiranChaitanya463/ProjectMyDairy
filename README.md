# MyDairy

MyDairy is a web-based diary application built with springboot and mysql where users can register, log in, and manage personal diary entries.

## Features

User registration and login  
CRUD operations for diary entries (Create, Read, Update, Delete)  
RESTful APIs built with Spring Boot  
Data persistence with MySQL  
React frontend for interactive UI  


---

## Tech Stack

- **Backend:** Spring Boot, Spring Data JPA, MySQL
- **Frontend:** React.js, Axios, React Router
- **Tools:** Maven, VS Code, IntelliJ IDEA

---

## Getting Started

### Backend (Spring Boot)

1. Navigate to the backend folder:
    ```
    cd backend
    ```
2. Configure `application.properties` for your MySQL DB connection:
    ```properties
    spring.datasource.url=jdbc:mysql://localhost:3306/mydairydb
    spring.datasource.username=root
    spring.datasource.password=yourpassword
    ```
3. Run the application:
    ```
    mvn spring-boot:run
    ```
The backend server will start (e.g. on `http://localhost:8080`).

---

### Frontend (React)

1. Navigate to the frontend folder:
    ```
    cd frontend
    ```
2. Install dependencies:
    ```
    npm install
    ```
3. Start the React development server:
    ```
    npm start
    ```
The frontend will run on `http://localhost:3000`.



---

## Author

- Chaitanya (https://github.com/KiranChaitanya463)

