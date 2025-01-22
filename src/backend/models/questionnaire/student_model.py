from bd2_sql import db2
class Student(db2.Model):
    __tablename__ = 'student'
    __bindkey__ = 'database_b'
    student_id = db2.Column(db2.BigInteger, primary_key=True)
    gender_id = db2.Column(db2.Integer)
    age = db2.Column(db2.Integer)
    student_schooling_level_id = db2.Column(db2.Integer)
    study_field_id = db2.Column(db2.Integer)
    household_type_id = db2.Column(db2.Integer)
    hobby_id = db2.Column(db2.Integer)
    vg_id = db2.Column(db2.Integer)
    academic_perf_id = db2.Column(db2.Integer)
    academic_info_id = db2.Column(db2.Integer)
    family_id = db2.Column(db2.Integer)
    health_issue = db2.Column(db2.Boolean)