from bd_sql import db

class Studytime(db.Model):
    __tablename__ = 'studytime'
    studytime_id = db.Column(db.BigInteger, primary_key=True)
    studytime_range = db.Column(db.String(50))
