from bd_sql import db2
class GenderDict(db2.Model):
    __tablename__ = 'gender_dict'
    gender_id = db2.Column(db2.BigInteger, primary_key=True)
    gender = db2.Column(db2.String(35), nullable=False)