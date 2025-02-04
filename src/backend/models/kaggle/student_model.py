from bd_sql import db


class Student(db.Model):
    __tablename__ = 'student_kaggle'

    student_id = db.Column(db.Integer, primary_key=True)
    school = db.Column(db.String(10))
    sex = db.Column(db.String(1))
    age = db.Column(db.Integer)
    address = db.Column(db.String(1))
    
    
    student_family_id = db.Column(db.Integer, db.ForeignKey('student_family.student_family_id'))
    performance_id = db.Column(db.Integer, db.ForeignKey('performance.performance_id'))
    study_habits_id = db.Column(db.Integer, db.ForeignKey('study_habits.study_habits_id'))
    support_id = db.Column(db.Integer, db.ForeignKey('support.support_id'))
    social_life_id = db.Column(db.Integer, db.ForeignKey('social_life.social_life_id'))
    health_id = db.Column(db.Integer, db.ForeignKey('health.health_id'))

    student_family = db.relationship('StudentFamily', backref='students', lazy=True)
    performance = db.relationship('Performance', backref='students', lazy=True)
    study_habits = db.relationship('StudyHabits', backref='students', lazy=True)
    support = db.relationship('Support', backref='students', lazy=True)
    social_life = db.relationship('SocialLife', backref='students', lazy=True)
    health = db.relationship('Health', backref='students', lazy=True)

    def __repr__(self):
        return f"<Student {self.student_id}>"
