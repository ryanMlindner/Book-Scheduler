#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, jsonify, make_response
from flask_restful import Resource

# Local imports
from config import app, db, api
# Model imports
from models import Book, Day, Schedule, BookRating, DayRating

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
        books_dict = [book.to_dict() for book in Book.query.all()]
        response = make_response(books_dict, 200)
        return response


api.add_resource(Index, '/')
api.add_resource(Books, '/books')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

