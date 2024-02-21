from core.db.connection import db
from core.db.models.task import Task


class TaskHandler:
    def create_task(self, title: str, deadline, is_completed: bool) -> Task:
        task = Task(title=title, deadline=deadline, is_completed=is_completed)
        db.session.add(task)
        db.session.commit()
        return task

    def get_all_tasks(self):
        return Task.query.all()

    def get_task_by_id(self, task_id: str) -> Task:
        return Task.query.filter_by(task_id=task_id).first()

    def update_task(self, task_id: str, title: str = None, deadline=None,
                    is_completed: bool = None) -> Task:

        task = Task.query.filter_by(task_id=task_id).first()

        if title is not None:
            task.title = title
        if deadline is not None:
            task.deadline = deadline
        if is_completed is not None:
            task.is_completed = is_completed

        db.session.commit()
        return task

    def delete_task(self, task_id: str) -> Task:
        task = Task.query.filter_by(task_id=task_id).first()
        db.session.delete(task)
        db.session.commit()
        return task
