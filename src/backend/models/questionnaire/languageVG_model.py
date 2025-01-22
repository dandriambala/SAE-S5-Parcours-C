from bd2_sql import db2
class LanguageVG(db2.Model):
    __tablename__ = 'language_vg'
    vg_id = db2.Column(db2.Integer, primary_key=True)
    language_id = db2.Column(db2.Integer, primary_key=True)