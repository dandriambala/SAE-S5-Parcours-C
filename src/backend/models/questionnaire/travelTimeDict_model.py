from bd2_sql import db2
class TravelTimeDict(db2.Model):
    __tablename__ = 'travel_time_dict'
    travel_time_id = db2.Column(db2.BigInteger, primary_key=True)
    travel_time = db2.Column(db2.String(25), nullable=False)