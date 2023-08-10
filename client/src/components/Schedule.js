import React from "react"
import { booksAtom } from "../helperFunctions/atoms"
import { useRecoilValue } from "recoil"
import BookDetails from "./BookDetails"

//for each matching book for a given day, displays a bookdetails card
export default function Schedule({ schedule }) {
  const books = useRecoilValue(booksAtom)
  const scheduledBook = books.filter((book) => book.id === schedule.book_id)[0]
  return (
    <div>
    {scheduledBook ?
    <div className="ui card">
      <div className="content">
        <BookDetails book={scheduledBook}/>
      </div>
    </div>
    :<h1></h1>
    }
    </div>
  )
}