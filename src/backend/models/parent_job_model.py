from bd2_sql import db2

class ParentJob(db2.Model):
    __tablename__ = 'parent_job'
    job_id = db2.Column(db2.Integer, primary_key=True, autoincrement=True)  # Clé primaire
    job_name = db2.Column(db2.String(50))  # Nom du métier

