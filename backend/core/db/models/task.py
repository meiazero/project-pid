from core.db.connection import db
from uuid import uuid4


class Task(db.Model):
    __tablename__ = 'tasks'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    task_id = db.Column(db.String(36), unique=True, default=uuid4)
    title = db.Column(db.String(255), nullable=True)
    description = db.Column(db.Text, nullable=True)
    deadline = db.Column(db.DateTime, nullable=True)
    is_completed = db.Column(db.Boolean, default=False, nullable=True)

    def __init__(self, title, description=None, deadline=None, is_completed=False):
        self.title = title
        self.description = description
        self.deadline = deadline
        self.is_completed = is_completed

    def __repr__(self):
        return '<Task %r>' % self.title
