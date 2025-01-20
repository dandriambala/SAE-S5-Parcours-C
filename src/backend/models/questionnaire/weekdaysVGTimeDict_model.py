from bd_sql import db
class WeekdaysVGTimeDict(db.Model):
    __tablename__ = 'weekdays_vg_time_dict'
    weekdays_vg_time_id = db.Column(db.BigInteger, primary_key=True)
    weekdays_vg_time = db.Column(db.String(15), nullable=False)