from flask_sqlalchemy import SQLAlchemy
import os

db = SQLAlchemy()


def configure_db(app):
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', "postgresql://postgres:my-secure-password@localhost:5432/pid")
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.init_app(app)
