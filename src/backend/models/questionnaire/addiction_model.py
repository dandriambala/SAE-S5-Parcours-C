from bd2_sql import db2

class Addiction(db2.Model):
    __tablename__ = 'addiction'
    student_id = db2.Column(db2.Integer, primary_key=True)
    addiction_id = db2.Column(db2.Integer, primary_key=True)