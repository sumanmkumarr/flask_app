from flask import Blueprint, request, jsonify
from models import Caregiver, db

caregivers_blueprint = Blueprint('caregivers', __name__)

# Get all caregivers
@caregivers_blueprint.route('/caregivers', methods=['GET'])
def get_caregivers():
    caregivers = Caregiver.query.all()
    result = [{"id": c.id, "name": c.name, "contact_info": c.contact_info} for c in caregivers]
    return jsonify(result)

# Add a new caregiver
@caregivers_blueprint.route('/caregivers', methods=['POST'])
def add_caregiver():
    data = request.json
    new_caregiver = Caregiver(name=data['name'], contact_info=data['contact_info'])
    db.session.add(new_caregiver)
    db.session.commit()
    return jsonify({"message": "Caregiver added successfully!"}), 201
