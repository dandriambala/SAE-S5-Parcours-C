from bd2_sql import db2

class Hobby(db2.Model):
    __tablename__ = 'hobby'
    hobby_id = db2.Column(db2.BigInteger, primary_key=True)
    weekdays_hobby_time_id = db2.Column(db2.Integer)
    weekend_hobby_time_id = db2.Column(db2.Integer)
    weekdays_chores_time_id = db2.Column(db2.Integer)
    weekend_chores_time_id = db2.Column(db2.Integer)
    hobby1_id = db2.Column(db2.Integer)
    hobby2_id = db2.Column(db2.Integer)
    hobby3_id = db2.Column(db2.Integer)
    SM_time_id = db2.Column(db2.Integer)
    sleep_SM = db2.Column(db2.Boolean)