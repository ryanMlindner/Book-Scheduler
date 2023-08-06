import React from "react";

function BookCard({ book }){

    return(
        <div >
            <h2>Title: {book.title}</h2>
            <h3>Author: {book.author}</h3>
        </div>
    )
}

export default BookCard