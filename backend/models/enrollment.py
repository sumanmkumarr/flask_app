# from app import db

# # Enrollment model
# class Enrollment(db.Model):
#     __tablename__ = 'enrollments'
#     id = db.Column(db.Integer, primary_key=True)
#     child_id = db.Column(db.Integer, db.ForeignKey('child.id'), nullable=False)
#     enrollment_date = db.Column(db.Date, nullable=False)
#     status = db.Column(db.String(50), nullable=False)
#     child = db.relationship('Child', backref=db.backref('enrollments', lazy=True))



from __init__ import db

class Enrollment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    child_name = db.Column(db.String(100), nullable=False)
    enrolled_date = db.Column(db.Date, nullable=False)

    def __repr__(self):
        return f'<Enrollment {self.child_name}>'
