

from __init__ import db

class Enrollment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    child_name = db.Column(db.String(100), nullable=False)
    enrolled_date = db.Column(db.Date, nullable=False)

    def __repr__(self):
        return f'<Enrollment {self.child_name}>'
