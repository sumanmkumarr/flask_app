from flask import Blueprint, request, jsonify
from models import Attendance, db

attendance_blueprint = Blueprint('attendance', __name__)

# Get attendance records
@attendance_blueprint.route('/attendance', methods=['GET'])
def get_attendance():
    attendance = Attendance.query.all()
    result = [{"id": a.id, "child_id": a.child_id, "date": a.date, "status": a.status} for a in attendance]
    return jsonify(result)

# Add a new attendance record
@attendance_blueprint.route('/attendance', methods=['POST'])
def add_attendance():
    data = request.json
    new_record = Attendance(child_id=data['child_id'], date=data['date'], status=data['status'])
    db.session.add(new_record)
    db.session.commit()
    return jsonify({"message": "Attendance recorded successfully!"}), 201
