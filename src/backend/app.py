from flask import Flask 
from config import Config
from flask_cors import CORS
from bd_sql import db
from controllers.guardian_controller import guardian_bp
from controllers.tables_controller import tables_bp
from controllers.tables2_controller import tables2_bp
from controllers.student_controller import student_bp
from controllers.student2_controller import student2_bp
from models.kaggle import *
from models.questionnaire import *

app = Flask(__name__)

app.config.from_object(Config)
db.init_app(app)



CORS(app)

app.register_blueprint(guardian_bp)
app.register_blueprint(tables_bp)
app.register_blueprint(student_bp)
app.register_blueprint(tables2_bp)
app.register_blueprint(student2_bp)

if __name__ == '__main__':
    app.run(debug=True)





