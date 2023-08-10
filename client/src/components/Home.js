import React from "react";
import { useState } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Schedule from "./Schedule";
import { useRecoilState, useRecoilValue } from "recoil";
import { booksAtom, dayAtom, daysAtom } from "../helperFunctions/atoms";

//TODOS HERE
//css clean up
//hook up new book form to a fetch



function Home(){
    const [value, setValue] = useState(new Date());
    const books = useRecoilValue(booksAtom);
    const days = useRecoilValue(daysAtom);
    const [day, setDay] = useRecoilState(dayAtom);

    window.onload = function(){
        handleChange(value);
    }

    //gets day from calendar and handles formatting to match the database
    //BUG
    //if someone adds a schedule to a day and then comes back to the homepage,
    //the calendar is incorrect until you click on another (or the same) day
    function handleChange(e){
        setValue(e)
        const formatDate = e.toISOString().slice(0, 10) + " 00:00:00";
        console.log(formatDate)
        const day = days.filter((day) => day.date === formatDate)[0]
        setDay(day)
        console.log(day)
    }

    function checkDisplay(day) {
        let disp = false
        if (day){
            if (day.schedules.length > 0) {
                disp = true
            }
        }
        return disp
    }

    return(
        <div>
        <div className="buffer"></div>
            <div className="ui grid">
                <div className="six wide column">
                    <Calendar onChange={(e) => handleChange(e)} value={value} />
                </div>
                <div className="ui cards">
                    {checkDisplay(day) ?
                    day.schedules.map(schedule => <Schedule key={schedule.id} schedule={schedule} />)
                    : <h1>No Books Scheduled today</h1>}
                </div>
            </div>
        </div>
    )
}

export default Home