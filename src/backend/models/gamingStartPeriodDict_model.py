from bd_sql import db

class GamingStartDict(db.Model):
    __tablename__ = 'gaming_start_period_dict'
    #__bind_key__ = 'database_b'
    gaming_start_period_id = db.Column(db.BigInteger, primary_key=True)
    gaming_start_period = db.Column(db.String(100))


