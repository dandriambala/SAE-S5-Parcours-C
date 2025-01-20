from bd_sql import db

class StudentFamily(db.Model):
    __tablename__ = 'student_family'
    student_family_id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    mother_job_id = db.Column(db.Integer)
    father_job_id = db.Column(db.Integer)
    guardian_id = db.Column(db.Integer)
    famsize = db.Column(db.String(10))
    Pstatus = db.Column(db.String(1))
    mother_edu_id = db.Column(db.Integer)
    father_edu_id = db.Column(db.Integer)
