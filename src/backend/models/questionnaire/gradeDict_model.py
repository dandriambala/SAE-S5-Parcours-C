from bd_sql import db
class GradeDict(db.Model):
    __tablename__ = 'grade_dict'
    grade_id = db.Column(db.BigInteger, primary_key=True)
    grade = db.Column(db.String(15), nullable=False)
