from bd2_sql import db2
class ReasonDict(db2.Model):
    __tablename__ = 'reason_dict'
    reason_id = db2.Column(db2.BigInteger, primary_key=True)
    reason = db2.Column(db2.String(45), nullable=False)