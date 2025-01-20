from bd_sql import db

class TravelTime(db.Model):
    __tablename__ = 'travel_time'
    travel_id = db.Column(db.BigInteger, primary_key=True)
    travel_time_range = db.Column(db.String(50))
