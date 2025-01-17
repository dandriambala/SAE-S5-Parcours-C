from bd_sql import db

class StudyTime(db.Model):
    __tablename__ = 'studytime'
    studytime_id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)  # Clé primaire
    studytime_range = db.Column(db.String(50))  # Intervalle de temps d'étude

    def __repr__(self):
        return f"<StudyTime studytime_id={self.studytime_id} studytime_range={self.studytime_range}>"
