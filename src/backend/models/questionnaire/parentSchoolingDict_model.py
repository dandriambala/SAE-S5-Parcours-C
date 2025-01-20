from bd_sql import db
class ParentSchoolingDict(db.Model):
    __tablename__ = 'parent_schooling_dict'
    parent_schooling_id = db.Column(db.BigInteger, primary_key=True)
    parent_schooling = db.Column(db.String(45), nullable=False)