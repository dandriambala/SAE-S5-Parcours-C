from bd_sql import db

class ParentJob(db.Model):
    __tablename__ = 'parent_job'
    job_id = db.Column(db.Integer, primary_key=True, autoincrement=True)  # Clé primaire
    job_name = db.Column(db.String(50))  # Nom du métier

