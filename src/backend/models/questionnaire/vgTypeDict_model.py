from bd_sql import db
class VGTypeDict(db.Model):
    __tablename__ = 'vg_type_dict'
    vg_type_id = db.Column(db.BigInteger, primary_key=True)
    vg_type = db.Column(db.String(45), nullable=False)