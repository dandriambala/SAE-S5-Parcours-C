from bd2_sql import db2
class WeekdaysVGTimeDict(db2.Model):
    __tablename__ = 'weekdays_vg_time_dict'
    weekdays_vg_time_id = db2.Column(db2.BigInteger, primary_key=True)
    weekdays_vg_time = db2.Column(db2.String(15), nullable=False)