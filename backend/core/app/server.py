from flask import Flask
from core.routes.todo import todo
from core.routes.app import app as app_blueprint
from core.db.connection import configure_db
from flask_migrate import Migrate
from core.db.connection import db
from flask_cors import CORS

app = Flask(__name__)
migrate = Migrate()
app.config.from_object('config')

# register blueprints
app.register_blueprint(todo)
app.register_blueprint(app_blueprint)
configure_db(app)
migrate.init_app(app, db)

cors = CORS(app, resources={r"/*": {"origins": "*"}})
