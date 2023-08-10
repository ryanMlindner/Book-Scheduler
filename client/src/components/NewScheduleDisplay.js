import React from "react";
import { bookAtom, booksAtom, dayAtom, daysAtom } from "../helperFunctions/atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import BookDetails from "./BookDetails";

const API = "http://localhost:3000"

export default function NewScheduleDisplay(){
  const book = useRecoilValue(bookAtom)
  const [day, setDay] = useRecoilState(dayAtom)
  const [books, setBooks] = useRecoilState(booksAtom)
  const [days, setDays] = useRecoilState(daysAtom)
  
  function handleClick() {
    const newSchedule = { book_id : book.id, day_id : day.id}

    //post to database, with the returned object, update days and books with the new schedules
    fetch(`${API}/schedule`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body : JSON.stringify(newSchedule)
    })
    .then(res => res.json())
    .then((data) => {
      fetch(`${API}/books/${data.book_id}`)
      .then(res => res.json())
      .then(updatedBook => {
        const updatedBooks = books.map((book) => {
          if (book.id === updatedBook.id) {return updatedBook;}
          else {return book;}
        });
        setBooks(updatedBooks)
      })
      fetch(`${API}/days/${data.day_id}`)
      .then(res => res.json())
      .then(updatedDay => {
        const updatedDays = days.map((day) => {
          if (day.id === updatedDay.id) {return updatedDay;}
          else {return day;}
        });
        setDays(updatedDays)
      })
    })
  }

  return(
    <div className="ui">
      {book ?
      <BookDetails book={book}/>
      : <h1>No Book Selected</h1>
      }
      {day ?
      <div className="ui fluid card">
        <div className="content">
          <div className="header">Date: {day.date}</div>
          <div className="description">Weekday: {day.weekday}</div>
        </div>
      </div>
      : <h1>No Day Selected</h1>
      }
      <div className="ui basic button" onClick={handleClick}>Add Selected Scheduling</div>
    </div>
  )
}