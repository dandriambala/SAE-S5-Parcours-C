from flask import Flask
from flask_cors import CORS
from config import Config, Config2
from bd_sql import db
from bd2_sql import db2
from controllers.tables_controller import tables_bp
from controllers.tables2_controller import tables2_bp
from controllers.student_controller import student_bp
from controllers.student2_controller import student2_bp
import threading

app = Flask(__name__)
CORS(app)
app.config.from_object(Config)
db.init_app(app)

app2 = Flask(__name__)
CORS(app2)
app2.config.from_object(Config2)
db2.init_app(app2)

app.register_blueprint(tables_bp)
app.register_blueprint(student_bp)

app2.register_blueprint(tables2_bp)
app2.register_blueprint(student2_bp)


def run_app1():
    app.run(port=5000, debug=True, use_reloader=False)


def run_app2():
    app2.run(port=5001, debug=True, use_reloader=False)


if __name__ == '__main__':
    thread1 = threading.Thread(target=run_app1)
    thread2 = threading.Thread(target=run_app2)

    thread1.start()
    thread2.start()

    thread1.join()
    thread2.join()
