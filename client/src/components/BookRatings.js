import React from "react"
import { bookRatingsAtom } from "../helperFunctions/atoms"
import { useRecoilState } from "recoil"
import { useEffect } from "react"
import RatingCard from "./RatingCard"

const API = 'http://localhost:5555/'

export default function BookRatings() {
  const [bookRatings, setBookRatings] = useRecoilState(bookRatingsAtom)
  useEffect(() => {
    fetch(`${API}ratings/book`)
    .then(res => res.json())
    .then(data => {
      setBookRatings(data)
    })
  }, [])

  return (
    <div className="ui cards">
      {bookRatings ?
      bookRatings.map(rating => {
        return <RatingCard key={rating.id} rating={rating}/>
      })
      : <h1>Loading...</h1>
      }
    </div>
  )
}