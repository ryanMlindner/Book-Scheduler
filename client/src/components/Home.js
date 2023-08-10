import React from "react";
import { useState } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import BookCard from "./BookCard";

function Home({ books }){
    const [value, setValue] = useState(new Date());
    const [booksOnDate, setBooksOnDate] = useState([])

    window.onload = function(){
        handleChange(value)
    }

    function handleChange(e){
        setValue(e)
        setBooksOnDate(books.filter(b => new Date(b.schedules.day.date).toDateString() === value.toDateString()))
    }

    return(
        <div>
            <Calendar onChange={(e) => handleChange(e)} value={value} />
            <ul>
                {booksOnDate.map(book => <BookCard key={book.id} book={book} />)}
            </ul>
        </div>
    )
}

export default Home