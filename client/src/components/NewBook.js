import React, { useState } from "react";

function NewBook({ addNewBook }){
    const [newBook, setNewBook] = useState({
        title: "", author: ""
    })

    function handleChange(e){
        setNewBook({ ...newBook, [e.target.name]: e.target.value })
    }

    function handleSubmit(e){
        e.preventDefault()
        addNewBook(newBook)
        setNewBook({title: "", author: ""})
    }

    return (
        <div>
            <h1>new book form</h1>
            <form onSubmit={e => handleSubmit(e)}>
                <input type="text" name="title" value={newBook.title} placeholder="Title" onChange={handleChange} />
                <input type="text" name="author" value={newBook.author} placeholder="Author" onChange={handleChange} />
                <button type="submit">Add Book</button>
            </form>
        </div>
    )
}

export default NewBook