from pymongo import MongoClient
import json


def get_conn():
    return MongoClient('mongodb://localhost:27017/')


def insert_movie_object_from_json(json_file, collection_name):
    client = get_conn()

    with open(json_file) as data_file:
        data = json.load(data_file)

    db = client['movies']

    for key in data:
        movie_object = data[key]
        movie_object["_id"] = key
        db[collection_name].insert(movie_object)


def insert_data_from_json(json_file, collection_name):
    client = get_conn()

    with open(json_file) as data_file:
        data = json.load(data_file)

    db = client['movies']

    for key in data:
        obj = data[key]
        insert_object = {"_id": key, collection_name: obj}
        db[collection_name].insert(insert_object)

# insert all the genres
# insert_data_from_json('genres.json', 'genres')

# insert all the reviews
# insert_data_from_json('reviews.json', 'reviews')

# insert all the my_list objects
# insert_data_from_json('my_list.json', 'my_list')

# insert all the last_loans objects
# insert_data_from_json('last_loans.json', 'last_loans')

# insert all the movie objects
# insert_movie_object_from_json("movies.json", "movie_objects")
