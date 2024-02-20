from typing import Dict
from core.driver.task import TaskHandler


class UpdateTaskController:
    def update(self, task_id: str, name: str, description: str, deadline: str, is_completed: bool) -> Dict:
        task_handler = TaskHandler()

        task = task_handler.update_task(task_id, name, description, deadline, is_completed)
        return self.__format_response(task)

    def __format_response(self, task) -> Dict:
        return {
            "data": {
                "task": {
                    "id": task.task_id,
                    "title": task.title,
                    "description": task.description,
                    "deadline": task.deadline,
                    "is_completed": task.is_completed
                }
            }
        }