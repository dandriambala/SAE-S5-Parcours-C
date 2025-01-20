from bd_sql import db

class ParentJob(db.Model):
    __tablename__ = 'parent_job'
    job_id = db.Column(db.BigInteger, primary_key=True)
    job_name = db.Column(db.String(50))
