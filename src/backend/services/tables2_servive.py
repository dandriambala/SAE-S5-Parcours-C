from repositories.tables2_repository import GeneralRepository
import logging

class BD2Service:
    @staticmethod
    def get_table_data(table_name):
        try:
            logging.info(f"Récupération des données pour la table : {table_name}")
            data = GeneralRepository.get_table_data(table_name)
            return data
        except Exception as e:
            logging.error(f"Erreur dans le service BD2 : {str(e)}")
            raise Exception(f"Erreur dans le service BD2 : {str(e)}")
