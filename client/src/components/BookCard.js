import React from "react";

function BookCard({ book, bookDetails }){

    return(
        <div >
            <h2>Title: {book.title}</h2>
            <h3>Author: {book.author}</h3>
            <button onClick={() => bookDetails(book)} > View details </button>
        </div>
    )
}

export default BookCard