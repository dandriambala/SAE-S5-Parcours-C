from bd_sql import db
class VG(db.Model):
    __tablename__ = 'vg'
    vg_id = db.Column(db.BigInteger, primary_key=True)
    vg_type1_id = db.Column(db.Integer)
    vg_type2_id = db.Column(db.Integer)
    violent = db.Column(db.Boolean)
    vg_platform_id = db.Column(db.Integer)
    weekdays_VG_time_id = db.Column(db.Integer)
    weekend_VG_time_id = db.Column(db.Integer)
    focus_VG = db.Column(db.Boolean)
    sleep_VG = db.Column(db.Boolean)
    gaming_start_period_id = db.Column(db.Integer)