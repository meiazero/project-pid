from typing import Dict
from core.driver.task import TaskHandler


class GetTaskByIdController:
    def get(self, task_id: str) -> Dict:
        task_handler = TaskHandler()

        task = task_handler.get_task_by_id(task_id)
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
