from bd_sql import db
class SchoolTypeDict(db.Model):
    __tablename__ = 'school_type_dict'
    school_type_id = db.Column(db.BigInteger, primary_key=True)
    school_type = db.Column(db.String(10), nullable=False)