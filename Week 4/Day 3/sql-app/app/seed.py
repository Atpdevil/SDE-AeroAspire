from app import create_app, db
from app.models import User

app = create_app()

with app.app_context():
    db.drop_all()
    db.create_all()
    
    users = [
        User(username="Gokul", email="gokul@example.com"),
        User(username="Goutham", email="goutham@example.com"),
        User(username="John", email="john@example.com")
    ]
    
    db.session.add_all(users)
    db.session.commit()
    print("Database seeded successfully!")
