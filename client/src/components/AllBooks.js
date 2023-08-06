import React, { useState } from "react";
import BookCard from "./BookCard";
import BookDetails from "./BookDetails";

function AllBooks({ books }){
    const [clicked, setClicked] = useState(false)
    const [currentBook, setCurrentBook] = useState()

    function handleClick(book){
        setClicked(true)
        setCurrentBook(book)
    }

    return(
        <div>
            {clicked ? <BookDetails book={currentBook} setClicked={setClicked} /> : books.map(book => <BookCard key={book.id} book={book} onClick={handleClick(book)}/>)}
        </div>
    )
}

export default AllBooks

// {books.map(book => <BookCard key={book.id} book={book} onClick={handleClick(book)}/>)}