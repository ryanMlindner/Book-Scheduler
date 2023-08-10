import React from "react";

function BookCard({ book, handleClick, deleteBook }){

    return(
        <div className="ui raised card">
            <div className="content">
                <div className="header">Title: {book.title}</div>
                <div className="description">Author: {book.author}</div>
            </div>
            <div className="extra content">
                <div className="ui basic two buttons">
                    <div className="ui basic blue button" 
                    onClick={() => handleClick(book)}>Add to Schedule</div>
                    <div className="ui basic red button" 
                    onClick={() => deleteBook(book)}>Delete Book</div>
                </div>
            </div>
        </div>
    )
}

export default BookCard