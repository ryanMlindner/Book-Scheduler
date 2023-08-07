#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import Book, Day, Schedule, BookRating, DayRating, db

def create_books():
    books = []
    #TODO loop
    book = Book(
        title = "The Starless Sea",
        author = "Erin Morgenstern",
    )
    books.append(book)
    return books

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("clearing db...")
        Book.query.delete()
        Day.query.delete()
        Schedule.query.delete()
        BookRating.query.delete()
        DayRating.query.delete()

        print("seeding books...")
        books = create_books()
        db.session.add_all(books)
        db.session.commit()

        
