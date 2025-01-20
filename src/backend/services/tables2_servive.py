from repositories.tables2_repository import GeneralRepository

class BD2Service:
    @staticmethod
    def get_table_data(table_name):
        try:
            data = GeneralRepository.get_table_data(table_name)
            return data
        except Exception as e:
            raise Exception(f"Erreur dans le service BD2 : {str(e)}")
