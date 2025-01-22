from bd2_sql import db2

class StudyTime(db2.Model):
    __tablename__ = 'studytime'
    studytime_id = db2.Column(db2.BigInteger, primary_key=True, autoincrement=True)  # Clé primaire
    studytime_range = db2.Column(db2.String(50))  # Intervalle de temps d'étude

    def __repr__(self):
        return f"<StudyTime studytime_id={self.studytime_id} studytime_range={self.studytime_range}>"
