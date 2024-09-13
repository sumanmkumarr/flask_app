# from app import db

# # Attendance model
# class Attendance(db.Model):
#     __tablename__ = 'attendance'
#     id = db.Column(db.Integer, primary_key=True)
#     child_id = db.Column(db.Integer, db.ForeignKey('child.id'), nullable=False)
#     date = db.Column(db.Date, nullable=False)
#     status = db.Column(db.String(10), nullable=False)
#     child = db.relationship('Child', backref=db.backref('attendance', lazy=True))


from __init__ import db

class Attendance(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, nullable=False)
    status = db.Column(db.String(50), nullable=False)

    def __repr__(self):
        return f'<Attendance {self.id}>'


