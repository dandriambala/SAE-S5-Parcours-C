from flask import Flask ,jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from controllers.guardian_controller import guardian_bp




app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://dutinfopw201691:bygydasa@database-etudiants.iut.univ-paris8.fr:3306/dutinfopw201691'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

CORS(app)


app.register_blueprint(guardian_bp, url_prefix='/api')



if __name__ == '__main__':
    app.run(debug=True)





    