from typing import Dict
from core.driver.task import TaskHandler


class DeleteTaskController:
    def delete(self, task_id: str) -> Dict:
        task_handler = TaskHandler()

        task = task_handler.delete_task(task_id)
        return self.__format_response(task)

    def __format_response(self, task) -> Dict:
        return {
            "data": {
                "task": {
                    "id": task.task_id,
                }
            }
        }
