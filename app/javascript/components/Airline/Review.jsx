import React from 'react'
import './review.css'
import Rating from '../Rating/Rating'

const Review = (props) => {
    const {score, title, description} = props.attributes;
    return(
        <div className='card'>
            <div className='rating-container'>
            <Rating score={score} />
            </div>
            <div className='title'>{title}</div>
            <div className='description'>{description}</div>
        </div>
    )
}

export default Review;