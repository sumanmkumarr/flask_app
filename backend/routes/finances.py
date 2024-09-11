from flask import Blueprint, request, jsonify
from models import Financial, db

finances_blueprint = Blueprint('finances', __name__)

# Get financial records
@finances_blueprint.route('/finances', methods=['GET'])
def get_finances():
    finances = Financial.query.all()
    result = [{"id": f.id, "child_id": f.child_id, "amount": f.amount, "payment_date": f.payment_date} for f in finances]
    return jsonify(result)

# Add a new financial record
@finances_blueprint.route('/finances', methods=['POST'])
def add_financial():
    data = request.json
    new_record = Financial(child_id=data['child_id'], amount=data['amount'], payment_date=data['payment_date'])
    db.session.add(new_record)
    db.session.commit()
    return jsonify({"message": "Financial record added successfully!"}), 201
