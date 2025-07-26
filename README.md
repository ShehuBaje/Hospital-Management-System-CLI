# Hospital System CLI

A robust **Node.js Command Line Interface (CLI)** application for managing hospital operations. This system allows administrators to manage doctors and patients, while doctors can diagnose and prescribe treatment to patients — all through an interactive terminal interface.

---

## Key Features

### Admin
- Register/login securely with email and password
- Register new doctors and patients
- View all users in the system
- Delete users by ID

### Doctor
- Login with credentials
- View list of registered patients
- Assign diagnosis and treatment records to patients

### Patient
- Check your own medical record using your patient ID

---

## Folder Structure

Hospital System CLI/
│
├── index.js # Main CLI entry point
│
├── data/ # JSON data storage
│ ├── users.json
│ ├── doctors.json
│ └── patients.json
│
├── manager/ # Business logic and role managers
│ ├── UserManager.js
│ ├── DoctorManager.js
│ └── PatientManager.js
│
├── utils/ # Reusable utility functions
│ ├── dataUtils.js # File I/O (read/write JSON)
│ └── hashUtils.js # Password hashing and comparison
│
├── node_modules/ # Installed dependencies
│
├── .gitignore
├── package.json
└── README.md


---

## Tech Stack

- **Node.js** (JavaScript runtime)
- **prompt-sync** (user input in terminal)
- **bcryptjs** (password hashing)
- **fs/promises** (file operations using JSON as storage)

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/ShehuBaje/hospital-system-cli.git
cd "Hospital System CLI"
2. Install Dependencies
npm install
3. Run the Application
node index.js
Sample Admin Flow
=== WELCOME TO THE HOSPITAL MANAGEMENT CLI ===

Who are you? (admin / doctor / patient): admin

What would you like to do? (register / login): login
Email: admin@gmail.com
Password: ********

Login successful! Welcome, Admin.

Choose an action:
- register doctor
- register patient
- view users
- delete user
Security Notes
Passwords are hashed using bcryptjs before being saved to file.

All sensitive actions require proper login.

Requirements
Node.js v14 or higher

Terminal or Command Prompt

License
This project is open-source and intended for educational and practice purposes.

Author
Shehu Baje Umar
Backend Developer (Internship Ready)
Email: shehuumarbaje@gmail.com

Contributions
Suggestions or improvements are welcome! Feel free to fork the repo or open an issue.