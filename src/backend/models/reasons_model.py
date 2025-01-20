from bd_sql import db

class Reason(db.Model):
    __tablename__ = 'reasons'
    reason_id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)  # Clé primaire
    reason_name = db.Column(db.String(50))  # Nom de la raison

    def __repr__(self):
        return f"<Reasons reason_id={self.reason_id} reason_name={self.reason_name}>"
