from flask import Flask, jsonify, request
from db_connector import query_db
from flask_cors import CORS
from recommendLogic import Recommendation_Logic
import logging
import spacy
from nltk.corpus import stopwords
from recommendLogic import spacy_logic
import pandas as pd


app = Flask(__name__)
CORS(app)

nlp = spacy.load("en_core_web_md", entity=False)
df = pd.read_csv("recommendLogic/meta_Toys_Features.csv")


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

    global df

    logging.basicConfig(filename='myapp.log', level=logging.INFO)
    logging.info('Subcategory is {}'.format(category))

    logging.info(df.head())

    stopwords = ["i","me","my","myself","we","our","ours","ourselves","you","your","yours","yourself","yourselves","he","him","his","himself","she","her","hers","herself","it","its","itself","they","them","their","theirs","themselves","what","which","who","whom","this","that","these","those","am","is","are","was","were","be","been","being","have","has","had","having","do","does","did","doing","a","an","the","and","but","if","or","because","as","until","while","of","at","by","for","with","about","against","between","into","through","during","before","after","above","below","to","from","up","down","in","out","on","off","over","under","again","further","then","once","here","there","when","where","why","how","all","any","both","each","few","more","most","other","some","such","no","nor","not","only","own","same","so","than","too","very","can","will","just","don","should","now"]

    words = keywords.split(",")
    for word in list(words):  # iterating on a copy since removing will mess things up
        if word in stopwords:
            words.remove(word)

    get_query = "SELECT * FROM meta_and_features"

    if len(words) == 0:
      get_query += "ORDER BY overall_rating DESC LIMIT 25;"
    elif len(words) == 1:
      get_query += "WHERE top_feature LIKE '%{}%'".format(words[0])
    else:
      for word in words:
        if word == words[0]:
          get_query += "WHERE top_feature LIKE '%{}%'".format(word)
        else:
          get_query += "OR top_feature LIKE '%{}%'.format(word) LIMIT 25"


    logging.info('Get query is {}'.format(get_query))

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
     app.run(host='0.0.0.0', debug=True, use_reloader=False)
