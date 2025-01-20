from bd_sql import db

class ParentEducation(db.Model):
    __tablename__ = 'parent_education'
    parent_edu_id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)  # Clé primaire
    parent_edu_level = db.Column(db.String(50))  # Niveau d'éducation

    def __repr__(self):
        return f"<ParentEducation parent_edu_id={self.parent_edu_id} parent_edu_level={self.parent_edu_level}>"
