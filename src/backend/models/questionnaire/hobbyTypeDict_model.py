from bd_sql import db
class HobbyTypeDict(db.Model):
    __tablename__ = 'hobby_type_dict'
    hobby_type_id = db.Column(db.BigInteger, primary_key=True)
    hobby_type = db.Column(db.String(45), nullable=False)