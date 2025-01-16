from repositories.student_repository import StudentRepository

class StudentService:
    @staticmethod
    def get_all_students():
        students = StudentRepository.get_all_students()
        return [{"id": s.student_id, "school": s.school, "sex": s.sex, "age": s.age, "address": s.address} for s in students]
