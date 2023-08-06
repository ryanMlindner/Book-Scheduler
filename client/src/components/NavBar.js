import React from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

function NavBar(){

    return(
        <div className="navbar-container">
            <NavLink className="add-book" to="/new" exact>Add Book</NavLink>
            <NavLink className="all-books" to="/books" exact>All Books</NavLink>
            <NavLink className="header" to="/" exact >Book Schedule</NavLink>
        </div>
    )
}

export default NavBar