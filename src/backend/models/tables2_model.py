from bd_sql import db

class TableBD2(db.Model):
    __abstract__ = True  # Cette classe ne doit pas être directement instanciée
