from bd_sql import db

class AcademicPerf(db.Model):
    __tablename__ = 'academic_perf'
    academic_perf_id = db.Column(db.BigInteger, primary_key=True)
    avg_grade = db.Column(db.Integer)
    english_avg_grade = db.Column(db.Integer)
    late = db.Column(db.Integer)
    late_incomplete_homework = db.Column(db.Integer)
    absences = db.Column(db.Integer)
    doubling = db.Column(db.Boolean)
    perf_evaluation = db.Column(db.Integer)
    classes_under_10 = db.Column(db.Integer)