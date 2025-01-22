from flask import Blueprint, jsonify
from services.student2_service import StudentService2

student2_bp = Blueprint('students2', __name__)

@student2_bp.route('/students2', methods=['GET'])
def get_all_students():
    try:
        students = StudentService2.get_all_students()
        return jsonify(students), 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 404
    except Exception as e:
        return jsonify({"error": f"Une erreur est survenue: {str(e)}"}), 500
