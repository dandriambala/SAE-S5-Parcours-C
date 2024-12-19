from flask import Flask
from controllers.individu_controller import individu_bp

from flask_cors import CORS

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "http://localhost:4200"}})

app.register_blueprint(individu_bp)


