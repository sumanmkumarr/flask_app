
from flask import Blueprint, request, jsonify
from models.finance import Finance
from __init__ import db

finances_blueprint = Blueprint('finances', __name__)

# Get all finance records
@finances_blueprint.route('/finances', methods=['GET'])
def get_finances():
    finances = Finance.query.all()
    return jsonify([{'id': finance.id, 'amount': finance.amount, 'description': finance.description} for finance in finances])

# Add a new finance record
@finances_blueprint.route('/finances', methods=['POST'])
def add_finance():
    data = request.json
    new_finance = Finance(amount=data['amount'], description=data['description'])
    db.session.add(new_finance)
    db.session.commit()
    return jsonify({'message': 'Finance added successfully!'}), 201
