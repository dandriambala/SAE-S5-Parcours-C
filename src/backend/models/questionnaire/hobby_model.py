from bd_sql import db

class Hobby(db.Model):
    __tablename__ = 'hobby'
    hobby_id = db.Column(db.BigInteger, primary_key=True)
    weekdays_hobby_time_id = db.Column(db.Integer)
    weekend_hobby_time_id = db.Column(db.Integer)
    weekdays_chores_time_id = db.Column(db.Integer)
    weekend_chores_time_id = db.Column(db.Integer)
    hobby1_id = db.Column(db.Integer)
    hobby2_id = db.Column(db.Integer)
    hobby3_id = db.Column(db.Integer)
    SM_time_id = db.Column(db.Integer)
    sleep_SM = db.Column(db.Boolean)