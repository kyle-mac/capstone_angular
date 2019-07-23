from flask import Flask, jsonify, request
from db_connector import query_db
from flask_cors import CORS
from recommendLogic import Recommendation_Logic
import logging
import spacy
from nltk.corpus import stopwords


app = Flask(__name__)
CORS(app)

nlp = spacy.load("en_core_web_sm")
stopWords = set(stopwords.words('english'))
for stop_word in stopWords:
    nlp.vocab[stop_word].is_stop = True


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


@app.route('/toyrecommendations/<keywords>/<category>', methods=['GET'])

def get_recommended_toys(keywords, category):

    logging.basicConfig(filename='myapp.log', level=logging.INFO)
    doc = nlp(keywords)



    #subcategory logic TBD
    logging.info('Subcategory is {}'.format(category))
    get_query = """SELECT meta_Toys_and_Games.*, consolidated_features.top_feature
                 FROM meta_Toys_and_Games
                 INNER JOIN consolidated_features ON meta_Toys_and_Games.asin = consolidated_features.asin
                 LIMIT 25"""
    recommendations = query_db(get_query,'GET')
    print(recommendations)
    return jsonify(recommendations)


@app.route('/getProductList/<featureList>/<productList>', methods=['GET'])

def get_product_list(featureList, productList):
    featureList = featureList.split(",")
    productList = productList.split(",")
    ASINS = Recommendation_Logic.return_recommendations(featureList, productList)
    return jsonify(ASINS)


@app.route('/finalResult/<finalProductsList>', methods=['GET'])

def get_final_result(finalProductsList):

    logging.basicConfig(filename='myapp.log', level=logging.INFO)


    finalProductsList = finalProductsList.split(",")
    productString = ""

    for item in finalProductsList:
        if item == finalProductsList[-1]:
            productString += ("'" + item + "'")
        else:
            productString += ("'" + item + "'" + ",")

    logging.info("Product string is {}".format(productString))


    get_query = """SELECT meta_Toys_and_Games.*, consolidated_features.top_feature
                                    FROM meta_Toys_and_Games
                                    INNER JOIN consolidated_features ON meta_Toys_and_Games.asin = consolidated_features.asin
                                    WHERE meta_Toys_and_Games.asin IN ({})""".format(productString)
    recommendations = query_db(get_query,'GET')
    return jsonify(recommendations)

if __name__ == '__main__':
     app.run(host='0.0.0.0')
