from bd2_sql import db2
class ParentSchoolingDict(db2.Model):
    __tablename__ = 'parent_schooling_dict'
    parent_schooling_id = db2.Column(db2.BigInteger, primary_key=True)
    parent_schooling = db2.Column(db2.String(45), nullable=False)