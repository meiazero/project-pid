from typing import Dict
from core.driver.task import TaskHandler


class GetTasksController:
    def get(self) -> Dict:
        task_handler = TaskHandler()

        tasks = task_handler.get_all_tasks()
        return self.__format_response(tasks)

    def __format_response(self, tasks) -> Dict:
        return {
            "data": {
                "tasks": [
                    {
                        "id": task.task_id,
                        "title": task.title,
                        "description": task.description,
                        "deadline": task.deadline,
                        "is_complete": task.is_completed
                    } for task in tasks
                ]
            }
        }