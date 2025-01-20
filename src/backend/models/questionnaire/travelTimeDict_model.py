from bd_sql import db
class TravelTimeDict(db.Model):
    __tablename__ = 'travel_time_dict'
    travel_time_id = db.Column(db.BigInteger, primary_key=True)
    travel_time = db.Column(db.String(25), nullable=False)