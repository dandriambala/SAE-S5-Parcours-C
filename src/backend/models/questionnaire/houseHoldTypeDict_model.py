from bd2_sql import db2
class HouseholdTypeDict(db2.Model):
    __tablename__ = 'household_type_dict'
    household_type_id = db2.Column(db2.BigInteger, primary_key=True)
    household_type = db2.Column(db2.String(35), nullable=False)