from bd_sql import db

class Performance(db.Model):
    __tablename__ = 'performance'
    performance_id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    G1_por = db.Column(db.Integer)
    G2_por = db.Column(db.Integer)
    G3_por = db.Column(db.Integer)
    G1_math = db.Column(db.Integer)
    G2_math = db.Column(db.Integer)
    G3_math = db.Column(db.Integer)
    failures_por = db.Column(db.Integer)
    failures_math = db.Column(db.Integer)

