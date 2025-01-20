from bd_sql import db
class VGLanguageDict(db.Model):
    __tablename__ = 'vg_language_dict'
    vg_language_id = db.Column(db.BigInteger, primary_key=True)
    vg_language = db.Column(db.String(25), nullable=False)