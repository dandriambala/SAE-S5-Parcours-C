from flask import Blueprint, jsonify
from services.tables2_servive import BD2Service

tables2_bp = Blueprint('tables', __name__, url_prefix='/tables')

@tables2_bp.route('/<table_name>', methods=['GET'])
def get_table_data(table_name):
    try:
        data = BD2Service.get_table_data(table_name)
        return jsonify({table_name: data})
    except Exception as e:
        return jsonify({"error": str(e)}), 500