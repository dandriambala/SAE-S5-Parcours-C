from bd2_sql import db2
class StudyFieldDict(db2.Model):
    __tablename__ = 'study_field_dict'
    study_field_id = db2.Column(db2.BigInteger, primary_key=True)
    study_field = db2.Column(db2.String(40), nullable=False)