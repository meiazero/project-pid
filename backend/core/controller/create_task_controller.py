from typing import Dict
from core.driver.task import TaskHandler
from datetime import datetime


class CreateTaskController:
    def create(self, title, deadline, is_completed) -> Dict:
        task_handler = TaskHandler()

        task = task_handler.create_task(title=title,
                                        deadline=deadline,
                                        is_completed=is_completed)
        return self.__format_response(task)

    def __format_response(self, task) -> Dict:
        return {
            "data": {
                "task": {
                    "id": task.task_id,
                    "title": task.title,
                    "deadline": task.deadline,
                    "is_completed": task.is_completed
                }
            }
        }
