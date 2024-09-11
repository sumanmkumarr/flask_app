from flask import Blueprint, request, jsonify
from models.child import Child
from __init__ import db  # Correct import for db

children_blueprint = Blueprint('children', __name__)

# Get all children
@children_blueprint.route('/children', methods=['GET'])
def get_children():
    children = Child.query.all()
    return jsonify([{'name': child.name, 'age': child.age} for child in children])

# Add a new child
@children_blueprint.route('/children', methods=['POST'])
def add_child():
    data = request.json
    new_child = Child(name=data['name'], age=data['age'])
    db.session.add(new_child)
    db.session.commit()
    return jsonify({'message': 'Child added successfully!'}), 201
