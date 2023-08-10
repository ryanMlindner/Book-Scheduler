import React from "react";
import { useState } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import BookCard from "./BookCard";

function Home({ books, schedules }){
    const [value, setValue] = useState(new Date());
    const [schedulesOnDate, setSchedulesOnDate] = useState([])

    window.onload = function(){
        handleChange(value)
    }

    function handleChange(e){
        setValue(e)
        setSchedulesOnDate(schedules.filter(s => new Date(s.day.date).toDateString() === new Date(value).toDateString()))
    }

    return(
        <div >
            <h1></h1>
            <Calendar onChange={(e) => handleChange(e)} value={value} />
            <ul>
                {schedulesOnDate.length === 0 ? <h1>No books scheduled on {value.toDateString()}</h1> : schedulesOnDate.map(sch => <BookCard key={sch.book.id} book={sch.book} />)}
            </ul>
        </div>
    )
}

export default Home