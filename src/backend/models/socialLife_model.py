from bd_sql import db

class SocialLife(db.Model):
    __tablename__ = 'social_life'
    social_life_id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    famrel = db.Column(db.Integer)
    freetime = db.Column(db.Integer)
    goout = db.Column(db.Integer)
    romantic = db.Column(db.Boolean)
    activities = db.Column(db.Boolean)
