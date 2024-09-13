# from flask import Blueprint, request, jsonify
# from models import Caregiver, db

# caregivers_blueprint = Blueprint('caregivers', __name__)

# # Get all caregivers
# @caregivers_blueprint.route('/caregivers', methods=['GET'])
# def get_caregivers():
#     caregivers = Caregiver.query.all()
#     result = [{"id": c.id, "name": c.name, "contact_info": c.contact_info} for c in caregivers]
#     return jsonify(result)

# # Add a new caregiver
# @caregivers_blueprint.route('/caregivers', methods=['POST'])
# def add_caregiver():
#     data = request.json
#     new_caregiver = Caregiver(name=data['name'], contact_info=data['contact_info'])
#     db.session.add(new_caregiver)
#     db.session.commit()
#     return jsonify({"message": "Caregiver added successfully!"}), 201


# from flask import Blueprint, request, jsonify
# from models.caregiver import Caregiver
# from __init__ import db  # Ensure you're importing the correct db object

# caregivers_blueprint = Blueprint('caregivers', __name__)

# # Get all caregivers
# @caregivers_blueprint.route('/caregivers', methods=['GET'])
# def get_caregivers():
#     caregivers = Caregiver.query.all()
#     return jsonify([{'name': caregiver.name, 'contact_info': caregiver.contact_info} for caregiver in caregivers])

# # Add a new caregiver
# @caregivers_blueprint.route('/caregivers', methods=['POST'])
# def add_caregiver():
#     data = request.json
#     new_caregiver = Caregiver(name=data['name'], contact_info=data['contact_info'])
#     db.session.add(new_caregiver)
#     db.session.commit()
#     return jsonify({'message': 'Caregiver added successfully!'}), 201


from flask import Blueprint, request, jsonify
from models.caregiver import Caregiver
from __init__ import db

caregivers_blueprint = Blueprint('caregivers', __name__)

# Get all caregivers
@caregivers_blueprint.route('/caregivers', methods=['GET'])
def get_caregivers():
    caregivers = Caregiver.query.all()
    return jsonify([{'id': caregiver.id, 'name': caregiver.name, 'contact_info': caregiver.contact_info} for caregiver in caregivers])

# Add a new caregiver
@caregivers_blueprint.route('/caregivers', methods=['POST'])
def add_caregiver():
    data = request.json
    new_caregiver = Caregiver(name=data['name'], contact_info=data['contact_info'])
    db.session.add(new_caregiver)
    db.session.commit()
    return jsonify({'id': new_caregiver.id, 'name': new_caregiver.name, 'contact_info': new_caregiver.contact_info}), 201
