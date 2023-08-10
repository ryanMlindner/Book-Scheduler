import React from "react";

export default function RatingCard( { rating }) {
  console.log(rating)
  let target = null
  let items = null
  if (rating.book) {
    target = ['Author:', 'Book Title:']
    items = [rating.book.author, rating.book.title]
  }
  if (rating.day) {
    target = ['Date:', 'Weekday:']
    items = [rating.day.date, rating.day.weekday]
  }

  return (
    <div className="ui raised card">
            <div className="content">
                <div className="header">{target[1]} {items[1]}</div>
                <div className="description">{target[0]} {items[0]}</div>
            </div>
            <div className="extra content">
              <div className="meta">Rating: {rating.value}</div>
              <div className="meta">Description: {rating.description}</div>
              <div className="meta">Author: {rating.rating_author}</div>
            </div>
        </div>
  )
}