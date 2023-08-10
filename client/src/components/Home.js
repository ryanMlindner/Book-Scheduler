import React from "react";
import { useState } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Schedule from "./Schedule";
//can do neat things like how i implemented new scheduling with recoil as opposed to
//vanilla state, which is why i added it
import { useRecoilState, useRecoilValue } from "recoil";
import { booksAtom, dayAtom, daysAtom } from "../helperFunctions/atoms";

//TODOS HERE
//css clean up
//page to display day ratings
//page to display book ratings
//hook up new book form to a fetch

//probably fix the nightmare i created here, we'll see


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
    //funnier BUG
    //clicking on a day that is not in the database crashes the whole app
    function handleChange(e){
        setValue(e)
        const formatDate = e.toISOString().slice(0, 10) + " 00:00:00";
        console.log(formatDate)
        const day = days.filter((day) => day.date === formatDate)[0]
        setDay(day)
        console.log(day)
    }

    return(
        <div className="ui grid">
            <div className="six wide column">
                <Calendar onChange={(e) => handleChange(e)} value={value} />
            </div>
            <div className="ui cards">
                {day.schedules ?
                day.schedules.map(schedule => <Schedule key={schedule.id} schedule={schedule} />)
                : <h1>No Books Scheduled today</h1>}
            </div>
        </div>
    )
}

export default Home