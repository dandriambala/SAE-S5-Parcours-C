from bd_sql import db
class WeekendVGTimeDict(db.Model):
    __tablename__ = 'weekend_vg_time_dict'
    weekend_vg_time_id = db.Column(db.BigInteger, primary_key=True)
    weekend_vg_time = db.Column(db.String(15), nullable=False)