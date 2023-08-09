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
    """takes a class model and returns the list of all objects in the database"""
    items = [item.to_dict() for item in cls.query.all()]
    return items

def get_one_dict(cls, id):
    """takes a class model and returns the matching id object in the database"""
    item = cls.query.filter(cls.id == id).first()
    return item.to_dict()

def get_filtered_by_book_dict(cls, id):
    """takes a class model and returns all items matching the book id in the database"""
    items = [item.to_dict() for item in cls.query.filter(cls.book_id == id).all()]
    return items

def delete_by_id(cls, id):
    """takes a class model and and id and attempts to delete the item, returns a good
    or bad response depending on if the item exists"""
    item = cls.query.filter(cls.id == id).first()
    if item != None:
        db.session.delete(item)
        db.session.commit()
        response = make_response({}, 204)
    else:
        response = make_response({"error": f"{cls} not found"}, 404)
    return response

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
    
    def post(self):
        json = request.get_json()
        try:
            new_book = Book(
                title = json["title"],
                author = json["author"]
            )
            db.session.add(new_book)
            db.session.commit()
            book_dict = new_book.to_dict()

            response = make_response(book_dict,201)
            return response
        
        except ValueError:
            response = make_response({"errors": ["validation errors"]},400)
            return response

class Days(Resource):
    def get(self):
        response = make_response(get_all_dict(Day), 200)
        return response

class Schedules(Resource):
    def get(self):
        response = make_response(get_all_dict(Schedule), 200)
        return response
    
    def post(self):
        json = request.get_json()
        try:
            new_schedule = Schedule(
                book_id = json["book_id"],
                day_id = json["day_id"],
            )
            db.session.add(new_schedule)
            db.session.commit()
            schedule_dict = new_schedule.to_dict()

            response = make_response(schedule_dict,201)
            return response
        
        except ValueError:
            response = make_response({"errors": ["validation errors"]},400)
            return response

class BookRatings(Resource):
    def get(self):
        response = make_response(get_all_dict(BookRating, id))
        return response
    
    def post(self):
        json = request.get_json()
        try:
            new_bookrating = BookRating(
                value = json["value"],
                description = json["description"],
                rating_author = json["rating_author"],
                book_id = json["book_id"]
            )
            db.session.add(new_bookrating)
            db.session.commit()
            bookrating_dict = new_bookrating.to_dict()

            response = make_response(bookrating_dict,201)
            return response
        
        except ValueError:
            response = make_response({"errors": ["validation errors"]},400)
            return response


class DayRatings(Resource):
    def get(self):
        response = make_response(get_all_dict(DayRating, id))
        return response

    def post(self):
        json = request.get_json()
        try:
            new_dayrating = DayRating(
                value = json["value"],
                description = json["description"],
                rating_author = json["rating_author"],
                day_id = json["day_id"]
            )
            db.session.add(new_dayrating)
            db.session.commit()
            dayrating_dict = new_dayrating.to_dict()

            response = make_response(dayrating_dict,201)
            return response
        
        except ValueError:
            response = make_response({"errors": ["validation errors"]},400)
            return response

class BooksByID(Resource):
    def get(self, id):
        response = make_response(get_one_dict(Book, id), 200)
        return response
    
    def delete(self, id):
        response = delete_by_id(Book, id)
        return response

class DaysByID(Resource):
    def get(self, id):
        response = make_response(get_one_dict(Day, id), 200)
        return response
    
    def delete(self, id):
        response = delete_by_id(Day, id)
        return response

class BookRatingsByBook(Resource):
    def get(self, id):
        response = make_response(get_filtered_by_book_dict(BookRating, id), 200)
        return response

class DayRatingsByBook(Resource):
    def get(self, id):
        response = make_response(get_filtered_by_book_dict(DayRating, id), 200)
        return response

class BookRatingsByID(Resource):
    def get(self, id):
        response = make_response(get_one_dict(BookRating, id), 200)
        return response
    
    def delete(self, id):
        response = delete_by_id(BookRating, id)
        return response

class DayRatingsByID(Resource):
    def get(self, id):
        response = make_response(get_one_dict(DayRating, id), 200)
        return response
    
    def delete(self, id):
        response = delete_by_id(DayRating, id)
        return response

class ScheduleByID(Resource):
    def get(self, id):
        response = make_response(get_one_dict(Schedule, id), 200)
        return response
    
    def delete(self, id):
        response = delete_by_id(Schedule, id)
        return response


# Endpoints
api.add_resource(Index, '/')
api.add_resource(Books, '/books')
api.add_resource(Days, '/days')
api.add_resource(Schedules, '/schedule')
api.add_resource(BookRatings, '/ratings/book')
api.add_resource(DayRatings, '/ratings/day')

api.add_resource(BooksByID, '/books/<int:id>')
api.add_resource(DaysByID, '/days/<int:id>')

api.add_resource(BookRatingsByBook, '/ratings/book/<int:id>')
api.add_resource(DayRatingsByBook, '/ratings/day/<int:id>')

api.add_resource(BookRatingsByID, '/dayrating/<int:id>')
api.add_resource(DayRatingsByID, '/bookrating/<int:id>')
api.add_resource(ScheduleByID, '/schedule/<int:id>')


if __name__ == '__main__':
    app.run(port=5555, debug=True)

