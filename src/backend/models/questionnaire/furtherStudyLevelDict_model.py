from bd2_sql import db2

class FurtherStudyLevelDict(db2.Model):
    __tablename__ = 'further_study_level_dict'
    further_study_level_id = db2.Column(db2.BigInteger, primary_key=True)
    further_study_level = db2.Column(db2.String(30), nullable=False)