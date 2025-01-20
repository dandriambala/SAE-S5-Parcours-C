from bd_sql import db

class DaytimeDict(db.Model):
    __tablename__ = 'daytime_dict'
    daytime_id = db.Column(db.BigInteger, primary_key=True)
    daytime = db.Column(db.String(40), nullable=False)