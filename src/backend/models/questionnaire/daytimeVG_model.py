from bd_sql import db

class DaytimeVG(db.Model):
    __tablename__ = 'daytime_vg'
    vg_id = db.Column(db.Integer, primary_key=True)
    daytime_id = db.Column(db.Integer, primary_key=True)