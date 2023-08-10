import React from "react"
import { dayRatingsAtom } from "../helperFunctions/atoms"
import { useRecoilState } from "recoil"
import { useEffect } from "react"
import RatingCard from "./RatingCard"

const API = 'http://localhost:5555/'
export default function DayRatings() {
  const [dayRatings, setDayRatings] = useRecoilState(dayRatingsAtom)
  useEffect(() => {
    fetch(`${API}ratings/day`)
    .then(res => res.json())
    .then(data => {
      setDayRatings(data)
    })
  }, [])

  return (
    <div className="ui cards">
      {dayRatings ?
      dayRatings.map(rating => {
        return <RatingCard key={rating.id} rating={rating}/>
      })
      : <h1>Loading...</h1>
      }
    </div>
  )
}