# Week 5 – Day 3: Docker Compose, Networking & .env Setup

## Overview

This task demonstrates how to containerize a full-stack application using Docker Compose, linking a Flask backend, React frontend, and MySQL database, while using .env files for configuration and testing container networking.

## Project Structure

```bash
Week 5/Day 3/
│
├─ backend/
│   ├─ app.py
│   ├─ requirements.txt
│   └─ config.py / .env (for DB credentials)
│
├─ frontend/
│   ├─ package.json
│   ├─ src/
│   │   └─ App.js
│   └─ Dockerfile
│
├─ docker-compose.yml
└─ .env
```

### Technologies Used

- Backend: Python 3.10, Flask, Flask-CORS
- Frontend: React, react-scripts
- Database: MySQL 8.0
- Containerization: Docker, Docker Compose
- Networking: Docker internal DNS for service-to-service communication
- Environment Variables: .env file for secrets & database credentials

### Running the Application

#### Build and start all containers

```bash
docker-compose up --build
```

#### Verify container health

```bash
docker ps
```

#### Access services

```bash
Frontend: http://localhost:3000
 → displays backend message

Backend: http://localhost:5000
 → returns JSON message

Database: Connected by backend at db:3306
```

---
