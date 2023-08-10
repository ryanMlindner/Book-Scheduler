import React from "react";

function BookCard({ book, handleClick }){

    return(
        <div className="ui raised card">
            <div className="content">
                <div className="header">Title: {book.title}</div>
                <div className="description">Author: {book.author}</div>
            </div>
            <div className="extra content">
                <div className="ui buttons">
                    <div className="ui basic button" 
                    onClick={() => handleClick(book)}>Add to Calendar</div>
                </div>
            </div>
        </div>
    )
}

export default BookCard