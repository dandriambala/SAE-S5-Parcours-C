from bd2_sql import db2
class VG(db2.Model):
    __tablename__ = 'vg'
    vg_id = db2.Column(db2.BigInteger, primary_key=True)
    vg_type1_id = db2.Column(db2.Integer)
    vg_type2_id = db2.Column(db2.Integer)
    violent = db2.Column(db2.Boolean)
    vg_platform_id = db2.Column(db2.Integer)
    weekdays_VG_time_id = db2.Column(db2.Integer)
    weekend_VG_time_id = db2.Column(db2.Integer)
    focus_VG = db2.Column(db2.Boolean)
    sleep_VG = db2.Column(db2.Boolean)
    gaming_start_period_id = db2.Column(db2.Integer)