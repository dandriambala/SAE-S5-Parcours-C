from bd2_sql import db2

class AcademicInfo(db2.Model):
    __tablename__ = 'academic_info'
    academic_info_id = db2.Column(db2.BigInteger, primary_key=True)
    school_type_id = db2.Column(db2.Integer)
    reason_id = db2.Column(db2.Integer)
    fam_support = db2.Column(db2.Boolean)
    academic_support = db2.Column(db2.Boolean)
    private_lessons = db2.Column(db2.Boolean)
    resources = db2.Column(db2.Boolean)
    studytime_id = db2.Column(db2.Integer)
    travel_time_id = db2.Column(db2.Integer)
    further_study = db2.Column(db2.Boolean)
    further_study_level_id = db2.Column(db2.Integer)