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


@app.route('/features', methods=['GET'])

def get_features():

    get_query = "SELECT * FROM consolidated_features"
    features = query_db(get_query,'GET')
    print(features)
    return jsonify(features)


@app.route('/toyrecommendations', methods=['GET'])

def get_recommended_toys():

    #subcategory logic TBD
    get_query = """SELECT meta_Toys_and_Games.*, consolidated_features.top_feature
                 FROM meta_Toys_and_Games
                 INNER JOIN consolidated_features ON meta_Toys_and_Games.asin = consolidated_features.asin
                 LIMIT 25"""
    recommendations = query_db(get_query,'GET')
    print(recommendations)
    return jsonify(recommendations)


@app.route('/getProductList/<features>', methods=['GET'])

def get_product_list(features):

    ### Python Logic
    ASINS = [1,2,3]

    return ASINS


@app.route('/finalResult/<finalProductsList>', methods=['GET'])

def get_final_result(finalProductsList):

    productString = "("
    for item in finalProductsList:
      productString += item
      productString += ","
    productString += ")"

    get_query = """SELECT meta_Toys_and_Games.*, consolidated_features.top_feature
                 FROM meta_Toys_and_Games
                 INNER JOIN consolidated_features ON meta_Toys_and_Games.asin = consolidated_features.asin
                 WHERE meta_Toys_and_Games.asin IN """ + productString
    recommendations = query_db(get_query,'GET')
    print(recommendations)
    return jsonify(recommendations)

if __name__ == '__main__':
     app.run(host='0.0.0.0')
