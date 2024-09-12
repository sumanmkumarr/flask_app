# from app import db

# # Financial model
# class Financial(db.Model):
#     __tablename__ = 'finances'
#     id = db.Column(db.Integer, primary_key=True)
#     child_id = db.Column(db.Integer, db.ForeignKey('child.id'), nullable=False)
#     amount = db.Column(db.Float, nullable=False)
#     payment_date = db.Column(db.Date, nullable=False)
#     child = db.relationship('Child', backref=db.backref('finances', lazy=True))


from __init__ import db

class Finance(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float, nullable=False)
    description = db.Column(db.String(255), nullable=False)

    def __repr__(self):
        return f'<Finance {self.id}>'
