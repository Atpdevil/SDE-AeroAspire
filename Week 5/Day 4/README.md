# Full Stack Project: Flask + React + MySQL (Dockerized)

## Overview

- This project demonstrates a full-stack application with:
- Backend: Flask API
- Frontend: React UI
- Database: MySQL
- Containerization: Docker + Docker Compose
- The goal of Day 4 was to test the full stack locally, view logs, clean unused Docker resources, and document the deployment process.

## Project Structure

```bash
project-root/
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/
│   ├── package.json
│   ├── Dockerfile
│   └── src/
├── docker-compose.yml
├── .env
└── README.md
```

### Verify installation

```bash
docker --version
docker-compose --version
```

### Build and Start Containers

From the root folder, run:

```bash
docker-compose up --build
```

### View Logs

#### View logs for all services

```bash
docker-compose logs
```

#### View logs for backend only

```bash
docker logs flask_backend
```

#### View logs for frontend only

```bash
docker logs react_frontend
```

#### View logs for database only

```bash
docker logs mysql_db
```

#### Stream logs in real-time

```bash
docker-compose logs -f
```

### Clean Unused Containers & Images

#### Stop all containers

```bash
docker-compose down
```

#### Remove dangling images

```bash
docker image prune -f
```

#### Remove unused volumes

```bash
docker volume prune -f
```

#### Remove everything (containers, networks, volumes, images)

```bash
docker system prune -a
```

### Task Completed

- Reflection / Retrospective
- Successfully tested full stack locally using Docker Compose.
- Learned to view logs for debugging backend, frontend, and database.
- Cleaned unused containers, images, and volumes to keep environment tidy.
- Documented the deployment process for reproducibility.
- Understood the importance of environment variables and container networking.

---
