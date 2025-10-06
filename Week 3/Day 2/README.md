# Flask Task Manager API (Week 3 Day 2) - [Oct 8]

## Learning Topics

- HTTP Methods: PUT & DELETE
- Parameter passing in URLs
- Path vs Query parameters
 
## Step 1 - Project Structure

```
my-flask-app/
├─ venv/
├─ app/
  ├─ init.py
  ├─ routes.py
  ├─ static/
  └─ templates/
├─ run.py
├─ requirements.txt
└─ README.md
```

---

## Setup & Run

### 1. Clone / download this repo

```
git clone <repo-url>
cd my-flask-app
```

### 2. Create virtual environment

#### Windows (PowerShell):
```
python -m venv venv
.\venv\Scripts\Activate.ps1
```
### 3. Install dependencies
```
pip install -r requirements.txt
```

### 4. Install Flask
```
pip install flask
```

### 4. Run the app
```
python run.py
```

**Server will start at http://127.0.0.1:5000/.**<br>

## Step 2 - Testing with Postman

### A. Create Task (POST /tasks)

- New Request → name it Create Task.<br>

**Request**
```
POST http://127.0.0.1:5000/tasks
```

**Body (raw → JSON)**
```
{
  "title": "Buy milk",
  "description": "2 litres",
  "completed": false
}
```
**Expected Response (201 Created)**
```
{
  "id": 1,
  "title": "Buy milk",
  "description": "2 litres",
  "completed": false
}
```
---
![screenshot1](./Image/Post.PNG)
---

### B. List All Tasks (GET /tasks)

New Request → List Tasks<br>
**Request**
```
GET http://127.0.0.1:5000/tasks
```

**Expected Response (200 OK)**
```
[
  {
    "id": 1,
    "title": "Buy milk",
    "description": "2 litres",
    "completed": false
  }
]
```
---
![screenshot2](./Image/Get1.PNG)
---
### C. Filter Tasks (GET /tasks?completed=true)

- New Request → List Completed<br>
- Method: GET
- Click Params tab (under the URL) and add:
- Key: completed Value: true <br>


**Expected Response**
```
Postman will show {{base_url}}/tasks?completed=true
```
---
![screenshot3](./Image/Get2.PNG)
---
### D. Update Task (PUT /tasks/<id>)

- New Request → Update Task
- Method: PUT

**Request**
```
URL: {{base_url}}/tasks/1
```

**Body (raw → JSON)**
```
{
  "completed": true
}
```

**Expected Response :**
```
If exists: 200 OK and updated task JSON returned.
If not exists: 404 with {"error":"Task not found"}
If no JSON body: 400 with {"error":"JSON body required"}
```
---
![screenshot4](./Image/Put.PNG)
---
### E. Delete Task (DELETE /tasks/<id>)

- New Request → Delete Task
- Method: DELETE

**Request**
```
{{base_url}}/tasks/1
```

**Expected Response**
```
If deleted: status 204 No Content (body empty).
If not found: 404 with {"error":"Task not found"}
```

---
![screenshot5](./Image/Delete.PNG)
---

**THE END**