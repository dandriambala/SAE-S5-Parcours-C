from flask import Flask
from flask_cors import CORS
from config import  Config2

from bd2_sql import db2

from controllers.tables2_controller import tables2_bp

from controllers.student2_controller import student2_bp
import threading


app2 = Flask(__name__)
CORS(app2)
app2.config.from_object(Config2)
db2.init_app(app2)


app2.register_blueprint(tables2_bp)
app2.register_blueprint(student2_bp)


if __name__ == '__main__':
    app2.run(port=5001, debug=True, use_reloader=False)


