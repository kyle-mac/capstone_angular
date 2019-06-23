from flask import Flask, jsonify, request
from db_connector import query_db

app = Flask(__name__)


@app.route('/categories')
def get_categories():

    categories = query_db('SHOW TABLES','GET')
    print(categories)
    return jsonify(categories)
