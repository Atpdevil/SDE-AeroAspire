from models import db, Task
from app import app

with app.app_context():
    db.create_all()
    if Task.query.count() == 0:
        sample_tasks = [
            Task(title="Complete Day 4", description="Go through Flask tutorials"),
            Task(title="Set up React frontend", description="Connect React to Flask API"),
        ]
        db.session.add_all(sample_tasks)
        db.session.commit()
        print("Seed data added!")
    else:
        print("Database already seeded!")
