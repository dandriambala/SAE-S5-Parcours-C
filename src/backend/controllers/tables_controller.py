from flask import Blueprint, jsonify
from services.tables_service import GeneralService

tables_bp = Blueprint('tables', __name__, url_prefix='/tables')

@tables_bp.route('/<table_name>', methods=['GET'])
def get_table_data(table_name):
    try:
        data = GeneralService.get_table_data(table_name)
        return jsonify({table_name: data})
    except ValueError as e:
        return jsonify({"error": str(e)}), 404
    except Exception as e:
        return jsonify({"error": f"Une erreur est survenue: {str(e)}"}), 500
