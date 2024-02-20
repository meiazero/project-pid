# core/db/connection.py
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


def configure_db(app):
    # app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://username:password@localhost/dbname'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.init_app(app)
