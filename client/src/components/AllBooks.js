import React, { useState } from "react";
import BookCard from "./BookCard";
import BookDetails from "./BookDetails";

function AllBooks({ books, scheduleBook, deleteBook }){
    const [clicked, setClicked] = useState(false)
    const [currentBook, setCurrentBook] = useState()

    function bookDetails(book){
        setClicked(true)
        setCurrentBook(book)
    }

    return(
        <div>
            {clicked ? <BookDetails book={currentBook} setClicked={setClicked} scheduleBook={scheduleBook} deleteBook={deleteBook} /> : books.map(book => <BookCard key={book.id} book={book} bookDetails={bookDetails} />)}
        </div>
    )
}

export default AllBooks

// {clicked ? <BookDetails book={currentBook} setClicked={setClicked} scheduleBook={scheduleBook} deleteBook={deleteBook} /> : books.map(book => <BookCard key={book.id} book={book} onClick={handleClick(book)}/>)}
// {books.map(book => <BookCard key={book.id} book={book} />)}
