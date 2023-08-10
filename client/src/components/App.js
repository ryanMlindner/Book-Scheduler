import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { booksAtom, daysAtom } from "../helperFunctions/atoms"; 
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import NewBook from "./NewBook";
import AllBooks from "./AllBooks";
import Home from "./Home";
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
		<div className="ui">
			
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
			</Switch>
		</div>
	)

	function addNewBook(newBook) {
		console.log(newBook)
	}
}

export default App;
