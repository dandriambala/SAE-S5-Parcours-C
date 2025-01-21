from bd_sql import db

class Support(db.Model):
    __tablename__ = 'support'
    support_id = db.Column(db.BigInteger, primary_key=True, autoincrement=False)
    schoolsup = db.Column(db.Boolean, nullable=True)
    famsup = db.Column(db.Boolean, nullable=True)
    paid_math = db.Column(db.Boolean, nullable=True)
    paid_por = db.Column(db.Boolean, nullable=True)
    internet = db.Column(db.Boolean, nullable=True)
    higher = db.Column(db.Boolean, nullable=True)
    reason_id = db.Column(db.Integer, db.ForeignKey('reason.reason_id'), nullable=True)
    nursery = db.Column(db.Boolean, nullable=True)

    reason = db.relationship('Reason', backref='supports')
