from bd2_sql import db2

class Reason(db2.Model):
    __tablename__ = 'reason'
    reason_id = db2.Column(db2.BigInteger, primary_key=True)
    reason = db2.Column(db2.String(50), nullable=True)
