-- ==========================================
-- IT Project Management (SQLite Schema)
-- ==========================================

-- Drop existing tables (for dev/testing only)
DROP TABLE IF EXISTS subtasks;
DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS users;

-- ==========================================
-- USERS TABLE
-- ==========================================
-- Includes both supervisor and staff
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role TEXT CHECK(role IN ('supervisor', 'staff')) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- PROJECTS TABLE
-- ==========================================
CREATE TABLE projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    supervisor_id INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (supervisor_id) REFERENCES users(id)
);

-- ==========================================
-- TASKS TABLE
-- ==========================================
CREATE TABLE tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    project_id INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(id)
);

-- ==========================================
-- SUBTASKS TABLE
-- ==========================================
CREATE TABLE subtasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    task_id INTEGER NOT NULL,
    status TEXT CHECK(status IN ('pending', 'in_progress', 'done')) DEFAULT 'pending',
    created_by INTEGER NOT NULL,
    status_updated_by INTEGER,
    assigned_to INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (task_id) REFERENCES tasks(id),
    FOREIGN KEY (created_by) REFERENCES users(id),
    FOREIGN KEY (status_updated_by) REFERENCES users(id),
    FOREIGN KEY (assigned_to) REFERENCES users(id)
);

-- ==========================================
-- INDEXES (for performance)
-- ==========================================
CREATE INDEX idx_projects_supervisor ON projects (supervisor_id);
CREATE INDEX idx_tasks_project ON tasks (project_id);
CREATE INDEX idx_subtasks_task ON subtasks (task_id);
CREATE INDEX idx_subtasks_assigned_to ON subtasks (assigned_to);
