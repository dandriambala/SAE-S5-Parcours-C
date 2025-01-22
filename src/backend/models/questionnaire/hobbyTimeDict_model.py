from bd_sql import db
class HobbyTimeDict(db.Model):
    __tablename__ = 'hobby_time_dict'
    hobby_time_id = db.Column(db.BigInteger, primary_key=True)
    hobby_time = db.Column(db.String(45), nullable=False)