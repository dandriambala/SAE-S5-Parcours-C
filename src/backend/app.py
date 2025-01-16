from flask import Flask 
from config import Config
from flask_cors import CORS
from bd_sql import db
from controllers.guardian_controller import guardian_bp
from controllers.tables_controller import tables_bp
from sqlalchemy import inspect

app = Flask(__name__)

app.config.from_object(Config)
db.init_app(app)

CORS(app)



app.register_blueprint(guardian_bp)
app.register_blueprint(tables_bp)

if __name__ == '__main__':
    app.run(debug=True)





