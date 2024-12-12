from flask import Flask
# exemple d'import : from controllers.company_controller import company_bp

from flask_cors import CORS

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "http://localhost:4200"}})

# exemple de bp : app.register_blueprint(company_bp)


