from bd_sql import db

class Health(db.Model):
    __tablename__ = 'health'
    health_id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    health = db.Column(db.Integer)
    Dalc = db.Column(db.Integer)
    Walc = db.Column(db.Integer)
