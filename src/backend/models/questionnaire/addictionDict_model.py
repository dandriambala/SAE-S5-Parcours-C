from bd2_sql import db2

class AddictionDict(db2.Model):
    __tablename__ = 'addiction_dict'
    addiction_id = db2.Column(db2.BigInteger, primary_key=True)
    addiction = db2.Column(db2.String(35), nullable=False)