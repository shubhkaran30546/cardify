🚀 Getting Started – Running the Application

🔧 Prerequisites
Before running the application, ensure the following are installed on your machine:

Java 17+
Node.js & npm (v16+ recommended)
PostgreSQL
Spring Boot-compatible IDE (IntelliJ IDEA)

-------------------------------------------------------------------------------------------

🛠️ Step 1: Install and Set Up PostgreSQL
Install PostgreSQL
Download and install from: https://www.postgresql.org/download/
Create a Database
Install pgadmin for view and edit tables


---------------------------------------------------------------------------------------------

⚙️ Step 2: Configure Spring Boot App
Navigate to the backend directory (where application.properties is located).
Update your application.properties file:

spring.datasource.url=jdbc:postgresql://localhost:5432/cardify
------------------------------------------------------------------------
Step 3: Run the Frontend (React)
Open a terminal and navigate to the frontend project directory, typically named cardify-frontend.
Install the dependencies using npm.
Start the React development server. It should run on port 3000.
--------------------------------------------------------------------------

Step 4: Run the Backend (Spring Boot)
Open the Spring Boot project in your IDE.
Locate the main application class (e.g., CardifyApplication.java).
Click the "Run" button in your IDE or run the Spring Boot app from the terminal using Maven.
The backend should start on port 8080.

-------------------------------------------------------------------------------------------
You're All Set!
Once both the frontend and backend are running, you can access the full Cardify application locally.




