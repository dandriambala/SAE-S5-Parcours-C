from bd_sql import db
class Student(db.Model):
    __tablename__ = 'student'
    __bindkey__ = 'database_b'
    student_id = db.Column(db.BigInteger, primary_key=True)
    gender_id = db.Column(db.Integer)
    age = db.Column(db.Integer)
    student_schooling_level_id = db.Column(db.Integer)
    study_field_id = db.Column(db.Integer)
    household_type_id = db.Column(db.Integer)
    hobby_id = db.Column(db.Integer)
    vg_id = db.Column(db.Integer)
    academic_perf_id = db.Column(db.Integer)
    academic_info_id = db.Column(db.Integer)
    family_id = db.Column(db.Integer)
    health_issue = db.Column(db.Boolean)