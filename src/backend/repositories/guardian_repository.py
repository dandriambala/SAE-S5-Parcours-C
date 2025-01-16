from models.guardians_model import Guardian

class GuardianRepository:
    @staticmethod
    def get_all_guardians():
        return Guardian.query.all()
