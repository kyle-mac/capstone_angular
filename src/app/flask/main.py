from flask import Flask, jsonify, request
from db_connector import query_db
from flask_cors import CORS


app = Flask(__name__)
CORS(app)


@app.route('/categories', methods=['GET'])

def get_categories():

    categories = query_db('SHOW TABLES','GET')
    print(categories)
    return jsonify(categories)

if __name__ == '__main__':
     app.run()
