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


class BookRating(db.Model, SerializerMixin):
    __tablename__ = 'bookratings'

    serialize_rules = ('-book.ratings',)

    id = db.Column(db.Integer, primary_key=True)
    value = db.Column(db.Integer)
    description = db.Column(db.String)
    author = db.Column(db.String)

    book_id = db.Column(db.Integer, db.ForeignKey('books.id'))

 
class DayRating(db.Model, SerializerMixin):
    __tablename__ = 'dayratings'

    serialize_rules = ('-day.ratings',)

    id = db.Column(db.Integer, primary_key=True)
    value = db.Column(db.Integer)
    description = db.Column(db.String)
    author = db.Column(db.String)

    day_id = db.Column(db.Integer, db.ForeignKey('days.id'))