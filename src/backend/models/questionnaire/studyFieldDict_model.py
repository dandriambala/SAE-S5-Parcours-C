from bd2_sql import db2
class StudytimeDict(db2.Model):
    __tablename__ = 'studytime_dict'
    studytime_id = db2.Column(db2.BigInteger, primary_key=True)
    studytime = db2.Column(db2.String(25), nullable=False)