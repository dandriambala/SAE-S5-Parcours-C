from models.kaggle.student_model import Student

class StudentRepository:
    @staticmethod
    def get_all_students():
        return Student.query.all()
