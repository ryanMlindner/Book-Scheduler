import React from "react";

function BookDetails({ book, setClicked }){

    return(
        <div >
            <p onClick={setClicked(false)}>Go back</p>
            {book}
        </div>
    )
}

export default BookDetails