from bd_sql import db

class ParentEducation(db.Model):
    __tablename__ = 'parent_education'
    parent_edu_id = db.Column(db.BigInteger, primary_key=True)
    parent_edu_level = db.Column(db.String(50))
