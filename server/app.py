#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, jsonify, make_response
from flask_restful import Resource

# Local imports
from config import app, db, api
# Model imports
from models import Book, Day, Schedule, BookRating, DayRating

def get_dict(cls):
    items = [item.to_dict() for item in cls.query.all()]
    return items

# Views
class Index(Resource):
    def get(self):
        response_dict = {
            "index": "Books. Bookish. Bookly."
        }
        response = make_response(response_dict, 200)
        return response

class Books(Resource):
    def get(self):
        response = make_response(get_dict(Book), 200)
        return response

class Days(Resource):
    def get(self):
        response = make_response(get_dict(Day), 200)
        return response

api.add_resource(Index, '/')
api.add_resource(Books, '/books')
api.add_resource(Days, '/days')

if __name__ == '__main__':
    app.run(port=5556, debug=True)

