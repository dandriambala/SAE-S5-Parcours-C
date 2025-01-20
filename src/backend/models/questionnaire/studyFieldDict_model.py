from bd_sql import db
class StudytimeDict(db.Model):
    __tablename__ = 'studytime_dict'
    studytime_id = db.Column(db.BigInteger, primary_key=True)
    studytime = db.Column(db.String(25), nullable=False)