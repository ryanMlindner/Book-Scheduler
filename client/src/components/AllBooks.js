import React, { useState } from "react";
import { bookAtom, booksAtom } from "../helperFunctions/atoms";

import BookCard from "./BookCard";
import BookDetails from "./BookDetails";
import { useRecoilState, useRecoilValue } from "recoil";

function AllBooks({ deleteBook }){
    const [currentBook, setCurrentBook] = useRecoilState(bookAtom)
    const books = useRecoilValue(booksAtom)
    console.log("render all books")
    console.log(books)

    //grabs book object from the clicked button for use in schedule
    function handleClick(book){
        setCurrentBook(book)
        //console.log(currentBook)
    }

    return(
        <div className="ui cards four wide column">
            {books ?
            books.map(book => {
            return <BookCard 
            key={book.id} 
            book={book}
            handleClick={handleClick}
            deleteBook={deleteBook}/>})
            : <h1>Loading...</h1>
            }
        </div>
    )
}

export default AllBooks

// {clicked ? <BookDetails book={currentBook} setClicked={setClicked} scheduleBook={scheduleBook} deleteBook={deleteBook} /> : books.map(book => <BookCard key={book.id} book={book} onClick={handleClick(book)}/>)}
// {books.map(book => <BookCard key={book.id} book={book} />)}
