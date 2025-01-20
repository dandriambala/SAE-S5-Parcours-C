from bd_sql import db

class GeneralRepository:
    @staticmethod
    def get_table_data(table_name):
        try:
            
            engine = db.get_engine(bind='database_b')
            connection = engine.connect()
            metadata = db.metadata
            metadata.reflect(bind=engine)

            if table_name not in metadata.tables:
                raise ValueError(f"La table '{table_name}' n'existe pas dans la base de données liée.")

            table = metadata.tables[table_name]
            result = connection.execute(table.select()).fetchall()
            columns = table.columns.keys()

            return [
                {column: row[idx] for idx, column in enumerate(columns)}
                for row in result
            ]
        except Exception as e:
            raise Exception(f"Erreur lors de la récupération des données : {str(e)}")
