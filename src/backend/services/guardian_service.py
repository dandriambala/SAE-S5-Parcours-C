from guardian_repository import GuardianRepository

class GuardianService:
    @staticmethod
    def get_all_guardians():
        guardians = GuardianRepository.get_all_guardians()
        return [{"id": g.guardian_id, "name": g.guardian_name} for g in guardians]
