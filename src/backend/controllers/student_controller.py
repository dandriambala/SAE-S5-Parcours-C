from flask import Blueprint, jsonify
from services.student_service import StudentService

student_bp = Blueprint('students', __name__)

@student_bp.route('/students', methods=['GET'])
def get_all_students():
    try:
        students = StudentService.get_all_students()
        return jsonify(students), 200
    except Exception as e:
        return jsonify({"error": f"Une erreur est survenue: {str(e)}"}), 500
