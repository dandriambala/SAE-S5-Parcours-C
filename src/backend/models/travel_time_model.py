from bd2_sql import db2

class TravelTime(db2.Model):
    __tablename__ = 'travel_time'
    travel_id = db2.Column(db2.BigInteger, primary_key=True, autoincrement=True)  # Clé primaire
    travel_time_range = db2.Column(db2.String(50))  # Intervalle de temps de trajet

    def __repr__(self):
        return f"<TravelTime travel_id={self.travel_id} travel_time_range={self.travel_time_range}>"
