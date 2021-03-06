import React, {Fragment} from 'react'
import './reviewForm.scss'

const ReviewForm = (props) => {
    const ratingOptions = [5,4,3,2,1].map((score, index) => {
        return(
            <Fragment key={index}>
                <input type='radio' value={score} checked={props.review.score == score} name='rating' onChange={() => console.log('selected:', score)} id={`rating-${score}`} />
                <label onClick={props.setRating.bind(this, score)}></label>
            </Fragment>
        )
    })

    return (
        <div className='wrapper1'>
            <form onSubmit={props.handleSubmit}>
                <div className='headline'>{props.attributes.name}Share yor review</div>
                <div className='field'>
                    <input onChange={props.handleChange} value={props.review.title || ""} type='text' name='title' placeholder='Review title' />
                </div>
                <div className='field'>
                    <input onChange={props.handleChange} value={props.review.description || ""} type='text' name='description' placeholder='Review description' />
                </div>
                <div className='field'>
                    <div className='raiting-container'>
                        <div className='raiting-title-text'>Rate this airline</div>
                        <div className='rating-box'>
                            {ratingOptions}
                        </div>
                    </div>
                </div>
                <button className='submit-btn' type='submit'>Submit Your Review</button>
            </form>
        </div>
    )
}

export default ReviewForm;