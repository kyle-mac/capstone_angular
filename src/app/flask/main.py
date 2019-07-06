from flask import Flask, jsonify, request
from db_connector import query_db
from flask_cors import CORS


app = Flask(__name__)
CORS(app)


@app.route('/categories', methods=['GET'])

def get_categories():

    get_query = "SHOW TABLES"
    categories = query_db(get_query,'GET')
    print(categories)
    return jsonify(categories)


@app.route('/recommendations/<category>', methods=['GET'])

def get_recommendations(category):

    get_query = "SELECT * FROM {} LIMIT 10".format(category)
    recommendations = query_db(get_query,'GET')
    print(recommendations)
    return jsonify(recommendations)

@app.route('/features/<asin>', methods=['GET'])

def get_features(asin):

    get_query = "SELECT * FROM product_features WHERE asin = '{}'.format(asin)
    recommendations = query_db(get_query,'GET')
    print(recommendations)
    return jsonify(recommendations)

@app.route('/toyrecommendations/<subcategory>', methods=['GET'])

def get_recommended_toys():

    #subcategory logic TBD
    get_query = "SELECT meta_Toys_and_Games.*, product_features.top_feature_exemplar
                 FROM meta_Toys_and_Games
                 INNER JOIN product_features ON meta_Toys_and_Games.asin = product_features.asin"
    recommendations = query_db(get_query,'GET')
    print(recommendations)
    return jsonify(recommendations)


if __name__ == '__main__':
     app.run()
