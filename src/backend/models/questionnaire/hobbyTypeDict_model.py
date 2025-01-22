from bd2_sql import db2
class HobbyTypeDict(db2.Model):
    __tablename__ = 'hobby_type_dict'
    hobby_type_id = db2.Column(db2.BigInteger, primary_key=True)
    hobby_type = db2.Column(db2.String(45), nullable=False)