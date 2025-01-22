from bd2_sql import db2

class Family(db2.Model):
    __tablename__ = 'family'
    family_id = db2.Column(db2.BigInteger, primary_key=True)
    parent1_schooling_level_id = db2.Column(db2.Integer)
    parent2_schooling_level_id = db2.Column(db2.Integer)
    single_parent = db2.Column(db2.Boolean)
    expectations = db2.Column(db2.Boolean)