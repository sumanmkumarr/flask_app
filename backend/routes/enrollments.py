
from flask import Blueprint, request, jsonify
from models.enrollment import Enrollment
from __init__ import db

enrollments_blueprint = Blueprint('enrollments', __name__)

# Get all enrollments
@enrollments_blueprint.route('/enrollments', methods=['GET'])
def get_enrollments():
    enrollments = Enrollment.query.all()
    return jsonify([{
        'id': enrollment.id, 
        'child_name': enrollment.child_name, 
        'enrolled_date': enrollment.enrolled_date.strftime('%Y-%m-%d')
    } for enrollment in enrollments])

# Add a new enrollment
@enrollments_blueprint.route('/enrollments', methods=['POST'])
def add_enrollment():
    data = request.json
    new_enrollment = Enrollment(
        child_name=data['child_name'], 
        enrolled_date=data['enrolled_date']
    )
    db.session.add(new_enrollment)
    db.session.commit()
    return jsonify({'message': 'Enrollment added successfully!'}), 201
