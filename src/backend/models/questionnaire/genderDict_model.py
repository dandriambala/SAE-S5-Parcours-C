from bd_sql import db
class GenderDict(db.Model):
    __tablename__ = 'gender_dict'
    gender_id = db.Column(db.BigInteger, primary_key=True)
    gender = db.Column(db.String(35), nullable=False)