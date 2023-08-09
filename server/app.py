#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, jsonify, make_response
from flask_restful import Resource

# Local imports
from config import app, db, api
# Model imports
from models import Book, Day, Schedule, BookRating, DayRating

def get_all_dict(cls):
    items = [item.to_dict() for item in cls.query.all()]
    return items

def get_one_dict(cls, id):
    item = cls.query.filter(cls.id == id).first()
    return item.to_dict()

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
        response = make_response(get_all_dict(Book), 200)
        return response

class Days(Resource):
    def get(self):
        response = make_response(get_all_dict(Day), 200)
        return response

class Schedules(Resource):
    def get(self):
        response = make_response(get_all_dict(Schedule), 200)
        return response

class BookRatingsByID(Resource):
    def get(self, id):
        response = make_response(get_one_dict(BookRating, id), 200)
        return response

class DayRatingsByID(Resource):
    def get(self, id):
        response = make_response(get_one_dict(DayRating, id), 200)
        return response


api.add_resource(Index, '/')
api.add_resource(Books, '/books')
api.add_resource(Days, '/days')
api.add_resource(Schedules, '/schedule')
api.add_resource(BookRatingsByID, '/dayrating/<int:id>')
api.add_resource(DayRatingsByID, '/bookrating/<int:id>')


if __name__ == '__main__':
    app.run(port=5556, debug=True)

