from bd_sql import db

class Support(db.Model):
    __tablename__ = 'support'
    support_id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    schoolsup = db.Column(db.Boolean)
    famsup = db.Column(db.Boolean)
    paid = db.Column(db.Boolean)
    internet = db.Column(db.Boolean)
    higher = db.Column(db.Boolean)
    reason_id = db.Column(db.Integer)
    nursery = db.Column(db.Boolean)
