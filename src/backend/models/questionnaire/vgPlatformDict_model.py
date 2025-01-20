from bd_sql import db
class VGPlatformDict(db.Model):
    __tablename__ = 'vg_platform_dict'
    vg_platform_id = db.Column(db.BigInteger, primary_key=True)
    vg_platform = db.Column(db.String(10), nullable=False)