import React from "react";

function BookDetails({ book }){

    return(
        <div className="ui fluid card">
            <div className="content">
                <div className="header">Title: {book.title}</div>
                <div className="description">Author: {book.author}</div>
            </div>
        </div>
    )
}

export default BookDetails