import os

class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "dev-secret")
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "jwt-secret")
    LOG_FILE = os.getenv("LOG_FILE", "logs/app.log")
    JWT_ACCESS_TOKEN_EXPIRES = 3600  # seconds
