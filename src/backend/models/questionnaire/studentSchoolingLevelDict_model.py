from bd2_sql import db2
class StudentSchoolingLevelDict(db2.Model):
    __tablename__ = 'student_schooling_level_dict'
    student_schooling_level_id = db2.Column(db2.BigInteger, primary_key=True)
    student_schooling_level = db2.Column(db2.String(15), nullable=False)