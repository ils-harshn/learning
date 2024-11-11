from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Sample data
data = {
    # "harsh": {
    #     "boards": {
    #         "1": {"id": "1", "title": "asdasd", "description": "asdasd"},
    #         "2": {"id": "2", "title": "times", "description": "wow"},
    #     },
    #     "tasks": {
    #         "1": [{"id": "1", "columnId": "backlog", "title": "asdasd"}, {"id": "2", "columnId": "backlog", "title": "good"}],
    #     },
    # },
}

@app.route("/<app_id>/board/<board_id>", methods=["GET"])
def get_board(app_id, board_id):
    if app_id not in data:
        return jsonify({"message": "App not found."}), 404

    board = data[app_id]["boards"].get(board_id)

    if not board:
        return jsonify({"message": "Board not found."}), 404

    return jsonify(board)

@app.route("/<app_id>/<board_id>/tasks", methods=["GET"])
def get_tasks(app_id, board_id):
    if app_id not in data:
        data[app_id] = {"boards": {}, "tasks": {}}

    return jsonify(data[app_id]["tasks"].get(board_id, []))

@app.route("/<app_id>/<board_id>/tasks", methods=["POST"])
def create_tasks(app_id, board_id):
    new_tasks = request.get_json()

    if app_id not in data:
        data[app_id] = {"boards": {}, "tasks": {}}

    if board_id not in data[app_id]["tasks"]:
        data[app_id]["tasks"][board_id] = []

    data[app_id]["tasks"][board_id] = new_tasks

    return jsonify({"status": "done"})

@app.route("/<app_id>/boards/", methods=["GET"])
def get_boards(app_id):
    if app_id not in data:
        data[app_id] = {"boards": {}, "tasks": {}}

    return jsonify(list(data[app_id]["boards"].values()))

@app.route("/<app_id>/board", methods=["POST"])
def create_board(app_id):
    new_board = request.get_json()

    if app_id not in data:
        data[app_id] = {"boards": {}, "tasks": {}}

    data[app_id]["boards"][new_board["id"]] = new_board

    return jsonify(new_board)

@app.route("/<app_id>/board/<board_id>", methods=["DELETE"])
def delete_board(app_id, board_id):
    if app_id in data and board_id in data[app_id]["boards"]:
        del data[app_id]["boards"][board_id]
        return jsonify({"message": f"Board with ID {board_id} deleted successfully."})

    return jsonify({"message": "Board not found."}), 404

@app.route("/<app_id>/board/<board_id>", methods=["PUT"])
def update_board(app_id, board_id):
    updated_board_data = request.get_json()

    if app_id not in data or board_id not in data[app_id]["boards"]:
        return jsonify({"message": "Board not found."}), 404

    data[app_id]["boards"][board_id].update(updated_board_data)

    return jsonify(data[app_id]["boards"][board_id])

if __name__ == "__main__":
    app.run(port=3000)
