 
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS  # Import CORS

app = Flask(__name__)

# MySQL database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:Suman%40123@localhost/flask_app_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # Disable modification tracking

# Initialize the SQLAlchemy object
db = SQLAlchemy(app)

# Enable CORS for the entire app
CORS(app)

# Import and register your routes
from routes.children import children_blueprint
from routes.caregivers import caregivers_blueprint  # Add this import
from routes.attendances import attendances_blueprint  # Add this import
from routes.finances import finances_blueprint  # Add this import
from routes.enrollments import enrollments_blueprint  # Add this import

app.register_blueprint(children_blueprint)
app.register_blueprint(caregivers_blueprint)  # Register caregivers blueprint
app.register_blueprint(attendances_blueprint)  # Register attendance blueprint
app.register_blueprint(finances_blueprint)  # Register finances blueprint
app.register_blueprint(enrollments_blueprint)  # Register enrollments blueprint

# Add the base route for '/'
@app.route('/')
def index():
    return "Flask app connected to MySQL!"

# Create tables if they don't exist
with app.app_context():
    db.create_all()  # This will create the necessary tables in the database
