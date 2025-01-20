from bd_sql import db

class Family(db.Model):
    __tablename__ = 'family'
    family_id = db.Column(db.BigInteger, primary_key=True)
    parent1_schooling_level_id = db.Column(db.Integer)
    parent2_schooling_level_id = db.Column(db.Integer)
    single_parent = db.Column(db.Boolean)
    expectations = db.Column(db.Boolean)