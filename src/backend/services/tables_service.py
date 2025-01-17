from repositories.tables_repository import GeneralRepository

class GeneralService:
    @staticmethod
    def get_table_data(table_name):
        try:
            data = GeneralRepository.get_all_records(table_name)
            return data
        except ValueError as e:
            raise e  
        except Exception as e:
            raise Exception(f"Une erreur est survenue: {str(e)}")
