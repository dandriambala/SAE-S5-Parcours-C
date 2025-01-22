from bd2_sql import db2

class ParentEducation(db2.Model):
    __tablename__ = 'parent_education'
    parent_edu_id = db2.Column(db2.BigInteger, primary_key=True, autoincrement=True)  # Clé primaire
    parent_edu_level = db2.Column(db2.String(50))  # Niveau d'éducation

    def __repr__(self):
        return f"<ParentEducation parent_edu_id={self.parent_edu_id} parent_edu_level={self.parent_edu_level}>"
