from bd_sql import db

class StudyHabits(db.Model):
    __tablename__ = 'study_habits'
    study_habits_id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    travel_id = db.Column(db.Integer)
    studytime_id = db.Column(db.Integer)
    absences = db.Column(db.Integer)
