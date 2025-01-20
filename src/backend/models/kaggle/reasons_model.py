from bd_sql import db

class Reasons(db.Model):
    __tablename__ = 'reasons'
    reason_id = db.Column(db.Integer, primary_key=True)
    reason_name = db.Column(db.String(50))
