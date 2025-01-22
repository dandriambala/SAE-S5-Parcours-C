from bd2_sql import db2
class VGLanguageDict(db2.Model):
    __tablename__ = 'vg_language_dict'
    vg_language_id = db2.Column(db2.BigInteger, primary_key=True)
    vg_language = db2.Column(db2.String(25), nullable=False)