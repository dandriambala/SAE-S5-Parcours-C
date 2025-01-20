from bd_sql import db

class ChoresSMTimeDict(db.Model):
    __tablename__ = 'chores_sm_time_dict'
    chores_sm_time_id = db.Column(db.BigInteger, primary_key=True)
    chores_sm_time = db.Column(db.String(20), nullable=False)