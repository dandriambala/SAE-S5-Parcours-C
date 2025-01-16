from flask import Blueprint, jsonify
from services.student_service import StudentService

student_bp = Blueprint('students', __name__)

@student_bp.route('/students', methods=['GET'])
def get_all_students():
    students = StudentService.get_all_students()
    return jsonify(students), 200
