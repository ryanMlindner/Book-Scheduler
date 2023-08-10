import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { booksAtom, daysAtom } from "../helperFunctions/atoms"; 
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import NewBook from "./NewBook";
import AllBooks from "./AllBooks";
import Home from "./Home";
import DayRatings from "./DayRatings";
import BookRatings from "./BookRatings";
import NewScheduleDisplay from "./NewScheduleDisplay";

const API = 'http://localhost:5555/'

function App() {
	const [books, setBooks] = useRecoilState(booksAtom)
	const [days, setDays] = useRecoilState(daysAtom)

	useEffect(() => {
	fetch(`${API}books`)
  .then(res => res.json())
  .then(data => {
		//console.log(data)
		setBooks(data)
	})
	fetch(`${API}days`)
  .then(res => res.json())
  .then(data => {
		//console.log(data)
		setDays(data)
	})
	}, [])


	return (
		<div className="ui full-page">
			
			<NavBar />
			
			<Switch>
				<Route exact path="/">
					<Home/>
				</Route>
				<Route exact path="/new">
					<NewBook addNewBook={addNewBook}/>
				</Route>
				<Route exact path="/books">
					<AllBooks/>
				</Route>
				<Route exact path="/schedule">
					<NewScheduleDisplay/>
				</Route>
				<Route exact path="/dayratings">
					<DayRatings/>
				</Route>
				<Route exact path="/bookratings">
					<BookRatings/>
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
