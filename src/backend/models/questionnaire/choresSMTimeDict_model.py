from bd2_sql import db2

class ChoresSMTimeDict(db2.Model):
    __tablename__ = 'chores_sm_time_dict'
    chores_sm_time_id = db2.Column(db2.BigInteger, primary_key=True)
    chores_sm_time = db2.Column(db2.String(20), nullable=False)