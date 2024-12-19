from flask import Blueprint, jsonify, request, abort
from services import individu_service

individu_bp = Blueprint('individu', __name__)

@individu_bp.route('/individus', methods=['GET'])
def get_individus():
    individus = individu_service.get_all_individus()
    return jsonify(individus)

@individu_bp.route('/individus/<int:individu_id>', methods=['GET'])
def get_individu(individu_id):
    individu = individu_service.get_individu(individu_id)
    if individu is None:
        abort(404)
    return jsonify(individu)

@individu_bp.route('/individus', methods=['POST'])
def create_individu():
    individu_data = request.json
    new_individu = individu_service.create_individu(individu_data)
    return jsonify(new_individu), 201

@individu_bp.route('/individus/<int:individu_id>', methods=['PUT'])
def update_individu(individu_id):
    individu_data = request.json
    updated_individu = individu_service.update_individu(individu_id, individu_data)
    if updated_individu is None:
        abort(404)
    return jsonify(updated_individu)

@individu_bp.route('/individus/<int:individu_id>', methods=['DELETE'])
def delete_individu(individu_id):
    success = individu_service.delete_individu(individu_id)
    if not success:
        abort(404)
    return '', 204