from bd_sql import db
class StudentSchoolingLevelDict(db.Model):
    __tablename__ = 'student_schooling_level_dict'
    student_schooling_level_id = db.Column(db.BigInteger, primary_key=True)
    student_schooling_level = db.Column(db.String(15), nullable=False)