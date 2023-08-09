from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

# Models go here!
class Book(db.Model, SerializerMixin):
    __tablename__ = 'books'

    serialize_rules = ('-schedules.book',)

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    author = db.Column(db.String)

    ratings = db.relationship("BookRating", cascade="all, delete-orphan", backref="book")
    schedules = db.relationship("Schedule", cascade="all, delete-orphan", backref="book")

    @validates('title', 'author')
    def validate_scientist(self, key, entry):
        if key == 'title' :
            if entry == None or entry == '':
                raise ValueError("Book must have a title")
        if key == 'author':    
            if entry == None or entry == '':
                raise ValueError("Book must have an author")
        return entry

class Day(db.Model, SerializerMixin):
    __tablename__ = 'days'

    serialize_rules = ('-schedules.day',)

    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime)
    weekday = db.Column(db.String)

    ratings = db.relationship("DayRating", cascade="all, delete-orphan", backref="day")
    schedules = db.relationship("Schedule", cascade="all, delete-orphan", backref="day")


class Schedule(db.Model, SerializerMixin):
    __tablename__ = 'schedules'

    serialize_rules = ('-book.schedules', '-day.schedules')

    id = db.Column(db.Integer, primary_key=True)
    
    book_id = db.Column(db.Integer, db.ForeignKey('books.id'))
    day_id = db.Column(db.Integer, db.ForeignKey('days.id'))

    @validates('book_id', 'day_id')
    def validate_scientist(self, key, entry):
        if key == 'book_id' :
            if entry == None or entry == '':
                raise ValueError("Schedule must have a book")
        if key == 'day_id':    
            if entry == None or entry == '':
                raise ValueError("Schedule must have a day")
        return entry

class BookRating(db.Model, SerializerMixin):
    __tablename__ = 'bookratings'

    serialize_rules = ('-book.ratings',)

    id = db.Column(db.Integer, primary_key=True)
    value = db.Column(db.Integer)
    description = db.Column(db.String)
    rating_author = db.Column(db.String)

    book_id = db.Column(db.Integer, db.ForeignKey('books.id'))

    @validates('value', 'description', 'rating_author', 'book_id')
    def validate_scientist(self, key, entry):
        if key == 'value' :
            if entry > 5 or entry < 1:
                raise ValueError("Rating must be between 1 and 5")
        if key == 'description':    
            if entry == None or entry == '':
                raise ValueError("description must exist")
        if key == 'rating_author':    
            if entry == None or entry == '':
                raise ValueError("rating author must exist")
        if key == 'book_id':    
            if entry == None or entry == '':
                raise ValueError("rating must have a book")
        return entry
 
class DayRating(db.Model, SerializerMixin):
    __tablename__ = 'dayratings'

    serialize_rules = ('-day.ratings',)

    id = db.Column(db.Integer, primary_key=True)
    value = db.Column(db.Integer)
    description = db.Column(db.String)
    rating_author = db.Column(db.String)

    day_id = db.Column(db.Integer, db.ForeignKey('days.id'))

    @validates('value', 'description', 'rating_author', 'day_id')
    def validate_scientist(self, key, entry):
        if key == 'value' :
            if entry > 5 or entry < 1:
                raise ValueError("Rating must be between 1 and 5")
        if key == 'description':    
            if entry == None or entry == '':
                raise ValueError("description must exist")
        if key == 'rating_author':    
            if entry == None or entry == '':
                raise ValueError("rating author must exist")
        if key == 'day_id':    
            if entry == None or entry == '':
                raise ValueError("rating must have a day")
        return entry