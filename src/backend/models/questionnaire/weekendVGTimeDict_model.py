from bd2_sql import db2
class WeekendVGTimeDict(db2.Model):
    __tablename__ = 'weekend_vg_time_dict'
    weekend_vg_time_id = db2.Column(db2.BigInteger, primary_key=True)
    weekend_vg_time = db2.Column(db2.String(15), nullable=False)