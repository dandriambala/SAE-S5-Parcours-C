from bd2_sql import db2
class VGPlatformDict(db2.Model):
    __tablename__ = 'vg_platform_dict'
    vg_platform_id = db2.Column(db2.BigInteger, primary_key=True)
    vg_platform = db2.Column(db2.String(10), nullable=False)