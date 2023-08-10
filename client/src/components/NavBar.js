import React from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

function NavBar(){

    return(
        <div className="navbar-container">
            <div className="ui grid">
                <div className="three column row">
            <NavLink className="add-book column" activeClassName="current"
            to="/new" exact>Add Book</NavLink>
            <NavLink className="header column" activeClassName="current"
            to="/" exact >Book Schedule</NavLink>
            <NavLink className="all-books column" activeClassName="current"
            to="/books" exact>All Books</NavLink>
            </div>
            </div>
            <div className="ui grid">
                <div className="three column row">
            <NavLink className="add-schedule column" activeClassName="current"
            to="/schedule" exact>New Schedule</NavLink>
            <NavLink className="book-ratings column" activeClassName="current"
            to="/bookratings" exact>Book Ratings</NavLink>
            <NavLink className="day-ratings column" activeClassName="current"
            to="/dayratings" exact>Day Ratings</NavLink>
            </div>
            </div>
        </div>
    )
}

export default NavBar