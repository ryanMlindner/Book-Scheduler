import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import NewBook from "./NewBook";
import AllBooks from "./AllBooks";
import Home from "./Home";

const API = 'http://localhost:5555'

function App() {
	const [books, setBooks] = useState([])
	const [schedules, setSchedules] = useState([])
	const [days, setDays] = useState([])

	useEffect(() => fetch(`${API}/books`)
        .then(res => res.json())
        .then(setBooks), [])

	useEffect(() => fetch(`${API}/schedule`)
        .then(res => res.json())
        .then(setSchedules), [])

	useEffect(() => fetch(`${API}/days`)
        .then(res => res.json())
        .then(setDays), [])


	return (
		<div className="full-page">
			
			<NavBar />
			<Switch>
				<Route exact path="/">
					<Home books={books} schedules={schedules} />
				</Route>
				<Route exact path="/new">
					<NewBook addNewBook={addNewBook}/>
				</Route>
				<Route exact path="/books">
					<AllBooks books={books} schedules={schedules} scheduleBook={scheduleBook} deleteBook={deleteBook} />
				</Route>
			</Switch>
		</div>
	)

	function scheduleBook(book) {
		const dayID = days.find(d => new Date(d.date).toDateString() === new Date().toDateString()).id
        const newSchedule = {
            day_id: dayID,
            book_id: book.id
        }

		console.log(newSchedule)

        fetch(`${API}/schedule`, {
            method: "POST",
            headers:{
                Accepts: "application/json",
                "Content-type" : "application/json",
            },
            body: JSON.stringify(newSchedule),
        })
		.then(res => res.json())
		.then(json => setSchedules([...schedules, json]))
    }

	function deleteBook(book) {

	}

	function addNewBook(newBook) {
		fetch(`${API}/books`, {
            method: "POST",
            headers:{
                Accepts: "application/json",
                "Content-type" : "application/json",
            },
            body: JSON.stringify(newBook),
        })
		.then(res => res.json())
		.then(json => setBooks([...books, json]))
	}

}

export default App;
