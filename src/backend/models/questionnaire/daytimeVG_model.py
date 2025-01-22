from bd2_sql import db2

class DaytimeVG(db2.Model):
    __tablename__ = 'daytime_vg'
    vg_id = db2.Column(db2.Integer, primary_key=True)
    daytime_id = db2.Column(db2.Integer, primary_key=True)