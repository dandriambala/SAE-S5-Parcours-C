from flask import Flask
from flask_cors import CORS
from config import Config
from bd_sql import db

from controllers.tables_controller import tables_bp
from controllers.student_controller import student_bp


app = Flask(__name__)
CORS(app)
app.config.from_object(Config)
db.init_app(app)


app.register_blueprint(tables_bp)
app.register_blueprint(student_bp)






if __name__ == '__main__':
  app.run(port=5000, debug=True, use_reloader=False)