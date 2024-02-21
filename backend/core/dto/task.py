from core.dto.http_request import HttpRequest
from core.dto.http_response import HttpResponse
from core.controller.create_task_controller import CreateTaskController
from core.controller.get_tasks_controller import GetTasksController
from core.controller.get_task_by_id_controller import GetTaskByIdController
from core.controller.update_task_controller import UpdateTaskController
from core.controller.delete_task_controller import DeleteTaskController


class TaskCreator:
    def validate_and_create(self, http_request: HttpRequest) -> HttpResponse:
        body = http_request.body

        title = body.get("title")
        description = body.get("description")
        deadline = body.get("deadline")
        is_completed = body.get("is_completed")

        # instancia o controller
        create_task_controller = CreateTaskController()

        task = create_task_controller.create(title=title,
                                             description=description,
                                             deadline=deadline,
                                             is_completed=is_completed)

        return HttpResponse(status_code=201, body=task)


class TaskLister:
    def list(self) -> HttpResponse:
        get_task_controller = GetTasksController()

        tasks = get_task_controller.get()

        return HttpResponse(status_code=200, body=tasks)


class TaskDetail:
    def get(self, task_id: str) -> HttpResponse:
        get_task_by_id_controller = GetTaskByIdController()

        task = get_task_by_id_controller.get(task_id)

        return HttpResponse(status_code=200, body=task)


class TaskUpdater:
    def update(self, task_id: str, http_request: HttpRequest) -> HttpResponse:
        update_task_controller = UpdateTaskController()

        body = http_request.body

        name = body.get("title")
        description = body.get("description")
        deadline = body.get("deadline")
        is_completed = body.get("is_completed")

        task = update_task_controller.update(task_id, name, description, deadline, is_completed)

        return HttpResponse(status_code=200, body=task)


class TaskDeleter:
    def delete(self, task_id: str) -> HttpResponse:
        delete_task_controller = DeleteTaskController()

        task = delete_task_controller.delete(task_id)

        return HttpResponse(status_code=204, body=task)
