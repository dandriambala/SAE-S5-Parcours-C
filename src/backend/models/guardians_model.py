from src.backend.app import db
class Guardian(db.Model):
    __tablename__ = 'Guardians'
    guardian_id = db.Column(db.Integer, primary_key=True)
    guardian_name = db.Column(db.String(100))

