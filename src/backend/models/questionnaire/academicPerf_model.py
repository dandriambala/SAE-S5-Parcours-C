from bd2_sql import db2

class AcademicPerf(db2.Model):
    __tablename__ = 'academic_perf'
    academic_perf_id = db2.Column(db2.BigInteger, primary_key=True)
    avg_grade = db2.Column(db2.Integer)
    english_avg_grade = db2.Column(db2.Integer)
    late = db2.Column(db2.Integer)
    late_incomplete_homework = db2.Column(db2.Integer)
    absences = db2.Column(db2.Integer)
    doubling = db2.Column(db2.Boolean)
    perf_evaluation = db2.Column(db2.Integer)
    classes_under_10 = db2.Column(db2.Integer)