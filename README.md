# 🧩 IT Project Management System

A simple **project management REST API** built with **Node.js**, **Express**, and **SQLite**.  
It supports multi-role users (supervisor & staff), project/task/subtask management, and JWT-based authentication.

---

## 🚀 Features

- 🔐 **User Authentication**
  - Register & login for supervisor or staff roles
- 🧱 **Project Management**
  - Supervisors can create and manage projects
- 🗂️ **Task Management**
  - Supervisors can create tasks under specific projects
- 🧩 **Subtask Management**
  - Staff can create subtasks for assigned tasks
- 🧰 **Clean Architecture**
  - `controllers → services → repositories` structure
- 🧪 **Unit Testing** (Jest + Supertest)
- ⚙️ **CI/CD**
  - GitHub Actions workflow to run lint and tests on each push
- 🐳 **Docker Support**
  - Ready-to-run container with Docker Compose

---

## 🧭 Project Structure

```
src/
 ├── config/          # Database & environment setup
 ├── controllers/     # Route controllers (HTTP layer)
 ├── middleware/      # Auth, error handling, etc.
 ├── repositories/    # SQL queries and data access
 ├── routes/          # Express routes
 ├── services/        # Business logic
 ├── utils/           # Helpers, constants
 ├── app.js           # Express app initialization
 └── server.js        # Server entry point

migrations/
 └── sqlite_schema.sql  # Database schema

.github/
 └── workflows/
     └── ci.yml         # CI/CD pipeline

tests/                 # Jest test files
```

---

## ⚙️ Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/rizalilhamm/it-project-management.git
cd it-project-management
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Configure environment
Copy `.env.example` → `.env`, then update values:
```bash
PORT=3000
DATABASE_PATH=./itpm.db
JWT_SECRET=your-secret-key
```

### 4️⃣ Run database migration
```bash
npm run migrate
```
or manually:
```bash
sqlite3 itpm.db < migrations/sqlite_schema.sql
```

### 5️⃣ Start the server
```bash
npm start
```

Visit the API at **http://localhost:3000**

---

## 🧪 Running Tests
```bash
npm test
```

---

## 🐳 Using Docker
Build and run with:
```bash
docker-compose up --build
```

---

## ⚙️ CI/CD (GitHub Actions)
- Automatically runs tests and lint checks on every push.
- Located in `.github/workflows/ci.yml`.

---

## 📄 License
MIT License © 2025 — [Rizal Ilham](https://github.com/rizalilhamm)
