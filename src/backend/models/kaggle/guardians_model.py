from bd_sql import db

class Guardian(db.Model):
    __tablename__ = 'guardian'
    guardian_id = db.Column(db.Integer, primary_key=True)
    guardian_name = db.Column(db.String(100))
