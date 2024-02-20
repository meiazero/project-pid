from flask import Blueprint, request, jsonify

app = Blueprint('app', __name__)


@app.route("/", methods=["GET"])
def index(request):
    return jsonify({"message": "Hello, World!"})
