from flask import Blueprint, request, jsonify

app = Blueprint('app', __name__)


@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Hello, World!"}), 200