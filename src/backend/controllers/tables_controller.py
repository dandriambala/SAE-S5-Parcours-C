from flask import Blueprint, jsonify
from services.tables_service import GeneralService


tables_bp = Blueprint('/tables/<table_name>', __name__)

@tables_bp.route('/tables/<table_name>', methods=['GET'])
def get_table_data(table_name):
    """
    Récupère les données d'une table en fonction de son nom.
    """
    try:
        data = GeneralService.get_table_data(table_name)
        return jsonify({table_name: data})
    except ValueError as e:
        return jsonify({"error": str(e)}), 404
    except Exception as e:
        return jsonify({"error": f"Une erreur est survenue: {str(e)}"}), 500

