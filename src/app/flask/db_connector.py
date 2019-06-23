import mysql.connector
import configparser


def query_db(query, query_type):

    config = configparser.ConfigParser()
    config.read('local_db.ini')
    db_config = config['LOCAL_DB']

    cnx = mysql.connector.connect(user = db_config['user'],
                                  password = db_config['password'],
                                  host = db_config['host'],
                                  port = db_config['port'],
                                  ssl_disabled = db_config['ssl_disabled'],
                                  database = db_config['database'],
                                  allow_local_infile = db_config['allow_local_infile'])
    cursor = cnx.cursor()

    if query_type == 'POST':
        cursor.execute(query)
        cnx.commit()

    elif query_type == 'GET':
        cursor.execute(query)
        records = cursor.fetchall()
        return records

    else:
        print('Unsupported API Call')

    cnx.close()
    cursor.close()

results = query_db('SELECT * FROM Toys_and_Games LIMIT 10','GET')
print(results)
