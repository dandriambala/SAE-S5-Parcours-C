from bd_sql import db
class StudyFieldDict(db.Model):
    __tablename__ = 'study_field_dict'
    study_field_id = db.Column(db.BigInteger, primary_key=True)
    study_field = db.Column(db.String(40), nullable=False)