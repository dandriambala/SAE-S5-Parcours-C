from bd2_sql import db2
class GradeDict(db2.Model):
    __tablename__ = 'grade_dict'
    grade_id = db2.Column(db2.BigInteger, primary_key=True)
    grade = db2.Column(db2.String(15), nullable=False)
