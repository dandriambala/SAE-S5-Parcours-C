from bd2_sql import db2
class VGTypeDict(db2.Model):
    __tablename__ = 'vg_type_dict'
    vg_type_id = db2.Column(db2.BigInteger, primary_key=True)
    vg_type = db2.Column(db2.String(45), nullable=False)