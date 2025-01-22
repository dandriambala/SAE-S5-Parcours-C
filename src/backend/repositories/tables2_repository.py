from bd2_sql import db2

class GeneralRepository:
    @staticmethod
    def get_table_data(table_name):
        if table_name not in db2.metadata.tables:
            raise ValueError(f"La table '{table_name}' n'existe pas dans la base de données.")
        
        table = db2.metadata.tables[table_name]
        result = db2.session.execute(table.select()).fetchall()
        columns = table.columns.keys()

        return [
            {column: row[idx] for idx, column in enumerate(columns)}
            for row in result
        ]