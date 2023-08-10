import React from "react";


function BookDetails({ book, setClicked, scheduleBook, deleteBook }){

    return(
        <div >
            <button onClick={() => setClicked(false)}>Go back</button>
            <h2>Title: {book.title}</h2>
            <h3>Author: {book.author}</h3>
            <button onClick={() => scheduleBook(book)}>Schedule book</button>
            <button onClick={() => deleteBook(book)} >Delete book</button>
        </div>
    )
}

export default BookDetails