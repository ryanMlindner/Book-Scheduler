import React from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

function NavBar(){

    return(
        <div className="navbar-container">
            <NavLink className="add-book" activeClassName="current"
            to="/new" exact>Add Book</NavLink>
            <NavLink className="all-books" activeClassName="current"
            to="/books" exact>All Books</NavLink>
            <NavLink className="header" activeClassName="current"
            to="/" exact >Book Schedule</NavLink>
            <NavLink className="add-schedule" activeClassName="current"
            to="/schedule" exact>New Schedule</NavLink>
        </div>
    )
}

export default NavBar