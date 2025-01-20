from bd_sql import db
class LanguageVG(db.Model):
    __tablename__ = 'language_vg'
    vg_id = db.Column(db.Integer, primary_key=True)
    language_id = db.Column(db.Integer, primary_key=True)