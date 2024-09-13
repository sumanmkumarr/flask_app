# from flask import Blueprint, request, jsonify
# from models import Enrollment, db

# enrollments_blueprint = Blueprint('enrollments', __name__)

# # Get enrollment records
# @enrollments_blueprint.route('/enrollments', methods=['GET'])
# def get_enrollments():
#     enrollments = Enrollment.query.all()
#     result = [{"id": e.id, "child_id": e.child_id, "enrollment_date": e.enrollment_date, "status": e.status} for e in enrollments]
#     return jsonify(result)

# # Add a new enrollment record
# @enrollments_blueprint.route('/enrollments', methods=['POST'])
# def add_enrollment():
#     data = request.json
#     new_enrollment = Enrollment(child_id=data['child_id'], enrollment_date=data['enrollment_date'], status=data['status'])
#     db.session.add(new_enrollment)
#     db.session.commit()
#     return jsonify({"message": "Enrollment recorded successfully!"}), 201


# from flask import Blueprint, request, jsonify
# from models.enrollment import Enrollment
# from __init__ import db

# enrollments_blueprint = Blueprint('enrollments', __name__)

# # Get all enrollments
# @enrollments_blueprint.route('/enrollments', methods=['GET'])
# def get_enrollments():
#     enrollments = Enrollment.query.all()
#     return jsonify([{'id': enrollment.id, 'child_name': enrollment.child_name, 'enrolled_date': enrollment.enrolled_date.strftime('%Y-%m-%d')} for enrollment in enrollments])

# # Add a new enrollment
# @enrollments_blueprint.route('/enrollments', methods=['POST'])
# def add_enrollment():
#     data = request.json
#     new_enrollment = Enrollment(child_name=data['child_name'], enrolled_date=data['enrolled_date'])
#     db.session.add(new_enrollment)
#     db.session.commit()
#     return jsonify({'message': 'Enrollment added successfully!'}), 201



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
