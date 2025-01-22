from bd2_sql import db2
class SchoolTypeDict(db2.Model):
    __tablename__ = 'school_type_dict'
    school_type_id = db2.Column(db2.BigInteger, primary_key=True)
    school_type = db2.Column(db2.String(10), nullable=False)