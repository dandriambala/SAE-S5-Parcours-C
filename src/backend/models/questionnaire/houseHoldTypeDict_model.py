from bd_sql import db
class HouseholdTypeDict(db.Model):
    __tablename__ = 'household_type_dict'
    household_type_id = db.Column(db.BigInteger, primary_key=True)
    household_type = db.Column(db.String(35), nullable=False)