from bd_sql import db

class GeneralRepository:
    @staticmethod
    def get_all_records(table_name):
        """
        Récupère toutes les lignes de la table donnée par son nom.
        """
        if table_name not in db.metadata.tables:
            raise ValueError(f"La table '{table_name}' n'existe pas dans la base de données.")
        
        table = db.metadata.tables[table_name]
        result = db.session.execute(table.select()).fetchall()
        columns = table.columns.keys()

        return [
            {column: row[idx] for idx, column in enumerate(columns)}
            for row in result
        ]
