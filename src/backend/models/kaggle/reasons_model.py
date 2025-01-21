from bd_sql import db

class Reason(db.Model):
    __tablename__ = 'reason'
    reason_id = db.Column(db.BigInteger, primary_key=True)
    reason = db.Column(db.String(50), nullable=True)

