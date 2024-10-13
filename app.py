from flask import Flask
from flask_jwt_extended import JWTManager
from model import db
from routes.auth import auth
from config import Config
from flask_cors import CORS

app = Flask(__name__)
app.config.from_object(Config)
CORS(app)  

# Initialize database
db.init_app(app)

# Initialize JWT manager
jwt = JWTManager(app)

# Register blueprints
app.register_blueprint(auth)

# Create database tables
with app.app_context():
    db.create_all()  # Create database tables

# Error handling for JWT
@jwt.unauthorized_loader
def unauthorized_response(callback):
    return {'msg': 'Missing authorization header'}, 401

@jwt.invalid_token_loader
def invalid_token_response(callback):
    return {'msg': 'Invalid token'}, 401

@jwt.expired_token_loader
def expired_token_response(callback):
    return {'msg': 'Token has expired'}, 401

if __name__ == '__main__':
    app.run(debug=True)