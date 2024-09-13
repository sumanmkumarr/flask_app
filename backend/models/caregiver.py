

from __init__ import db

class Caregiver(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    contact_info = db.Column(db.String(255), nullable=False)

    def __repr__(self):
        return f'<Caregiver {self.name}>'
