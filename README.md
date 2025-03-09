SecureConnect
SecureConnect is a secure and user-friendly authentication system that allows users to sign up, log in, and manage their accounts with ease. The project enforces validation rules, manages errors effectively, and provides a polished user experience.

Features

Signup Page

Input Fields: Username, Password, Confirm Password.
Validation:
Username must be at least 8 characters long and unique.
Password must contain at least one lowercase letter, one uppercase letter, and one special character.
Confirm Password must match the Password.
Real-Time Validation: Errors are displayed as the user types.
Password Strength Indicator: Dynamically updates based on password complexity.
Confirmation Dialog: Shows a success message and redirects to the login page after 2 seconds.
Login Page

Input Fields: Username, Password.
Validation:
Fields cannot be empty.
Username must exist, and the password must be correct.
Real-Time Validation: Errors are displayed as the user types.
Session Management: Keeps the user logged in until they click "Logout."
Landing Page

Personalized Message: Displays "Hello, <username>!"
Logout Button: Redirects the user to the login page.
Technologies Used

Frontend: React, Tailwind CSS.
Backend: Node.js, Express.
Database: MySQL (via XAMPP and phpMyAdmin).
Authentication: JSON Web Tokens (JWT).
