from bd2_sql import db2
class HobbyTimeDict(db2.Model):
    __tablename__ = 'hobby_time_dict'
    hobby_time_id = db2.Column(db2.BigInteger, primary_key=True)
    hobby_time = db2.Column(db2.String(45), nullable=False)