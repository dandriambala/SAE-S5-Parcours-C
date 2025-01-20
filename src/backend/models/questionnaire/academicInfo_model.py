from bd_sql import db

class AcademicInfo(db.Model):
    __tablename__ = 'academic_info'
    academic_info_id = db.Column(db.BigInteger, primary_key=True)
    school_type_id = db.Column(db.Integer)
    reason_id = db.Column(db.Integer)
    fam_support = db.Column(db.Boolean)
    academic_support = db.Column(db.Boolean)
    private_lessons = db.Column(db.Boolean)
    resources = db.Column(db.Boolean)
    studytime_id = db.Column(db.Integer)
    travel_time_id = db.Column(db.Integer)
    further_study = db.Column(db.Boolean)
    further_study_level_id = db.Column(db.Integer)