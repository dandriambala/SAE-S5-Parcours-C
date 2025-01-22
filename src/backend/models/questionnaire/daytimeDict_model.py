from bd2_sql import db2

class DaytimeDict(db2.Model):
    __tablename__ = 'daytime_dict'
    daytime_id = db2.Column(db2.BigInteger, primary_key=True)
    daytime = db2.Column(db2.String(40), nullable=False)