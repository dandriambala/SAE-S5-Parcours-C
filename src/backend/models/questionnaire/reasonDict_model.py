from bd_sql import db
class ReasonDict(db.Model):
    __tablename__ = 'reason_dict'
    reason_id = db.Column(db.BigInteger, primary_key=True)
    reason = db.Column(db.String(45), nullable=False)