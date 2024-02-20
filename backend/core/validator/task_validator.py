from cerberus import Validator

from core.errors.http_unprocessable_entity import HttpUnprocessableEntityError


def task_create_validator(request: any) -> None:
    body_validator = Validator({
        "title": {
            "type": "string",
            "required": True,
            "empty": False,
            "nullable": False
        },
        "description": {
            "type": "string",
            "required": False,
            "empty": False,
            "nullable": True
        },
        "deadline": {
            "type": "string",
            "required": True,
            "empty": False,
            "nullable": False
        },
        "is_completed": {
            "type": "boolean",
            "required": False,
            "empty": False,
            "nullable": True
        }
    })

    response = body_validator.validate(request.json)

    if response is not True:
        raise HttpUnprocessableEntityError(body_validator.errors)
