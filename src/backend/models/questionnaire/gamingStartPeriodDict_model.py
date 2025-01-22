from bd2_sql import db2

class GamingStartDict(db2.Model):
    __tablename__ = 'gaming_start_period_dict'
    gaming_start_period_id = db2.Column(db2.BigInteger, primary_key=True)
    gaming_start_period = db2.Column(db2.String(100))


