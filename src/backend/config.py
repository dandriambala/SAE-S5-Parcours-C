class Config:
    SQLALCHEMY_DATABASE_URI = 'mysql+mysqlconnector://dutinfopw201695:dapabunu@database-etudiants.iut.univ-paris8.fr:3306/dutinfopw201695'
    SQLALCHEMY_BINDS = {
        'database_b': 'mysql+mysqlconnector://dutinfopw201691:bygydasa@database-etudiants.iut.univ-paris8.fr:3306/dutinfopw201691'
    }
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    DEBUG = True


#mdp BD1 bygydasa
#mdp BD2 dapabunu