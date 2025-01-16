from flask import Blueprint, jsonify
from guardian_service import GuardianService

guardian_bp = Blueprint('guardians', __name__)

@guardian_bp.route('/guardians', methods=['GET'])
def get_all_guardians():
    guardians = GuardianService.get_all_guardians()
    return jsonify(guardians), 200
