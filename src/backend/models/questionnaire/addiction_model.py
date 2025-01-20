from bd_sql import db

class Addiction(db.Model):
    __tablename__ = 'addiction'
    student_id = db.Column(db.Integer, primary_key=True)
    addiction_id = db.Column(db.Integer, primary_key=True)