import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import NewBook from "./NewBook";
import AllBooks from "./AllBooks";
import Home from "./Home";

// API = 'http://localhost:5555/books'

function App() {
	const [books, setBooks] = useState([])

	// useEffect(() => fetch(API)
    //     .then(res => res.json())
    //     .then(setBooks), [])


	return (
		<div>
			
			<NavBar />
			<Switch>
				<Route exact path="/">
					<Home books={books}/>
				</Route>
				<Route exact path="/new">
					<NewBook addNewBook={addNewBook}/>
				</Route>
				<Route exact path="/books">
					<AllBooks books={books} />
				</Route>
			</Switch>
		</div>
	)

	function addNewBook(newBook) {
		console.log(newBook)
	}
}

export default App;
