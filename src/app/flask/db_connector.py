import mysql.connector
import configparser


def query_db(query, query_type):

    config = configparser.ConfigParser()
    config.read('local_db.ini')
    db_config = config['LOCAL_DB']

    config = configparser.ConfigParser()

    cnx = mysql.connector.connect(user = "root",
                                  password = "###",
                                  host = "toysdb.cfgxocvigumz.us-east-1.rds.amazonaws.com",
                                  port = "3306",
                                  database = "recommender")
    cursor = cnx.cursor()

    if query_type == 'POST':
        cursor.execute(query)
        cnx.commit()

    elif query_type == 'GET':
        cursor.execute(query, multi=True)
        records = cursor.fetchall()
        return records

    else:
        print('Unsupported API Call')

    cnx.close()
    cursor.close()
