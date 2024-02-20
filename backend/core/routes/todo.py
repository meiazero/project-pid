from flask import Blueprint, request, jsonify
from core.validator.task_validator import task_create_validator
from core.dto.task import TaskCreator, TaskLister, TaskDetail, TaskUpdater, TaskDeleter

from core.dto.http_request import HttpRequest
from core.errors.error_handler import handle_errors

todo = Blueprint('todo', __name__)


# cria uma tarefa recebendo um json com titulo, descricao, data de entrega e status (padrão é incompleto)
@todo.route("/todo", methods=["POST"])
def create_todo():
    response = None

    try:
        task_create_validator(request)
        task_creator = TaskCreator()

        http_request = HttpRequest(body=request.json)
        response = task_creator.validate_and_create(http_request)
    except Exception as error:
        response = handle_errors(error)

    return jsonify(response.body), response.status_code


# lista todas as tarefas
@todo.route("/todo", methods=["GET"])
def list_todo():
    task_lister = TaskLister()

    response = task_lister.list()

    return jsonify(response.body), response.status_code


# lista uma tarefa específica
@todo.route("/todo/<string:task_id>", methods=["GET"])
def get_todo(task_id):
    task_detail = TaskDetail()

    response = task_detail.get(task_id)

    return jsonify(response.body), response.status_code


# atualiza uma tarefa específica
@todo.route("/todo/<string:task_id>", methods=["PUT"])
def update_todo(task_id):
    response = None

    try:
        task_updater = TaskUpdater()

        http_request = HttpRequest(body=request.json)
        response = task_updater.update(task_id, http_request)

    except Exception as error:
        response = handle_errors(error)

    return jsonify(response.body), response.status_code


# deleta uma tarefa específica
@todo.route("/todo/<string:task_id>", methods=["DELETE"])
def delete_todo(task_id):
    task_deleter = TaskDeleter()

    response = task_deleter.delete(task_id)

    return jsonify(response.body), response.status_code
