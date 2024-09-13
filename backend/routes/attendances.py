
from flask import Blueprint, request, jsonify
from models.attendance import Attendance
from __init__ import db
from datetime import datetime

attendances_blueprint = Blueprint('attendances', __name__)

# Get all attendance records
@attendances_blueprint.route('/attendances', methods=['GET'])
def get_attendances():
    attendances = Attendance.query.all()
    return jsonify([{'id': attendance.id, 'date': attendance.date.strftime('%Y-%m-%d'), 'status': attendance.status} for attendance in attendances])

# Add a new attendance record
@attendances_blueprint.route('/attendances', methods=['POST'])
def add_attendance():
    data = request.json
    date = datetime.strptime(data['date'], '%Y-%m-%d')  # Convert string to date
    new_attendance = Attendance(id=data['id'], date=date, status=data['status'])
    db.session.add(new_attendance)
    db.session.commit()
    return jsonify({'message': 'Attendance added successfully!'}), 201

