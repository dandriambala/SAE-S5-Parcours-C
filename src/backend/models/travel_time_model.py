from bd_sql import db

class TravelTime(db.Model):
    __tablename__ = 'travel_time'
    travel_id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)  # Clé primaire
    travel_time_range = db.Column(db.String(50))  # Intervalle de temps de trajet

    def __repr__(self):
        return f"<TravelTime travel_id={self.travel_id} travel_time_range={self.travel_time_range}>"
