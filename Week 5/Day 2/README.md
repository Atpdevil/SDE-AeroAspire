# Dockerizing Flask Backend & React Frontend - Week 5 [Oct 23]

## Folder Structure

```bash
project/
│
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   └── Dockerfile
│
├── frontend/
│   ├── package.json
│   ├── src/
│   │   └── App.js
│   └── Dockerfile
│
└── docker-compose.yml
```

## Task Objective

- Containerize a Flask backend and React frontend using Docker.
- Build images, run locally, and test endpoints and UI.
- Connect frontend to backend inside Docker Compose.

## Steps Completed

- Backend Setup
- Created backend/app.py with /api endpoint returning JSON.
- Created backend/requirements.txt with Flask dependency.

### Wrote backend/Dockerfile

```bash
FROM python:3.10-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 5000
CMD ["python", "app.py"]
```

### Built and ran backend container

```bash
docker build -t flask-backend ./backend
docker run -d -p 5000:5000 flask-backend
```

Verified API:

**curl <http://localhost:5000/api>**

**Output: {"message":"Hello from Flask backend!"}**.

## Frontend Setup

- Created React app in frontend/ folder.
- Updated frontend/src/App.js to fetch backend data:
- fetch(<http://backend:5000/api>)

### Built React production build

```bash
npm run build
```

Wrote frontend/Dockerfile (multi-stage build):

```bash
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
```

### Serve with Nginx

```bash
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Built and ran frontend container

```bash
docker build -t react-frontend ./frontend
docker run -d -p 3000:80 react-frontend
```

**Verified UI at <http://localhost:3000>**
 → displayed backend message.

## Created docker-compose.yml

```bash
version: "3"
services:
  backend:
    build: ./backend
    container_name: flask-backend
    ports:
      - "5000:5000"
  frontend:
    build: ./frontend
    container_name: react-frontend
    ports:
      - "3000:80"
    depends_on:
      - backend
```

Updated frontend fetch URL to use service name:

**fetch("<http://backend:5000/api>")**

### Ran both containers together

```bash
docker compose up --build
```

### Verified

Backend API

```bash
curl http://localhost:5000/api
```

**Output: {"message":"Hello from Flask backend!"}**.

Frontend UI

```bash
Visit: http://localhost:3000
```

---
![screenshot](.Image/img1.PNG)

---
