#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
from datetime import date, timedelta
# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import Book, Day, Schedule, BookRating, DayRating, db

def create_books():
    """creates 40 random books with random authors and titles"""
    books = []
    for _ in range(40):
        book = Book(
            author=fake.name(),
            title=fake.sentence(nb_words=4),
        )
        books.append(book)
    return books

def populate_dates():
    """runs through a set of dates and puts them into the database"""
    def daterange(start_date, end_date):
        """takes a starting date and ending date,
        returns every date in between,
        in order"""
        for n in range(int((end_date - start_date).days)):
            yield start_date + timedelta(n)
    
    dates = []
    start_date = date(2023, 1, 1)
    end_date = date(2023, 12, 31)

    for date_instance in daterange(start_date, end_date):
        day = Day(
            date=date_instance,
            weekday=date_instance.weekday(),
        )
        dates.append(day)
    return dates

def create_random_dayratings():
    """populates dayratings with random values"""
    ratings = []
    for _ in range(20):
        rating = DayRating(
            value=randint(1,5),
            description=fake.sentence(nb_words=10),
            rating_author=fake.name(),
            day_id=rc(days).id,
        )
        ratings.append(rating)
    return ratings

def create_random_bookratings():
    """populates bookratings with random values"""
    ratings = []
    for _ in range(20):
        rating = BookRating(
            value=randint(1,5),
            description=fake.sentence(nb_words=10),
            rating_author=fake.name(),
            book_id=rc(books).id,
        )
        ratings.append(rating)
    return ratings

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
        print("creating days... you're welcome...")
        days = populate_dates()
        db.session.add_all(days)
        db.session.commit()
        print("making random ratings")
        dayratings = create_random_dayratings()
        db.session.add_all(dayratings)
        db.session.commit()
        bookratings = create_random_bookratings()
        db.session.add_all(bookratings)
        db.session.commit()
        
