from bd_sql import db

class FurtherStudyLevelDict(db.Model):
    __tablename__ = 'further_study_level_dict'
    further_study_level_id = db.Column(db.BigInteger, primary_key=True)
    further_study_level = db.Column(db.String(30), nullable=False)