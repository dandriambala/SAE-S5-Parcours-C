from bd_sql import db

class AddictionDict(db.Model):
    __tablename__ = 'addiction_dict'
    addiction_id = db.Column(db.BigInteger, primary_key=True)
    addiction = db.Column(db.String(35), nullable=False)