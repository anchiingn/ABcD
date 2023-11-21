import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { thunkFetchAddReview } from "../../store/reviewReducer";
import { thunkFetchSpotDetails } from "../../store/spotReducer";
import { useState } from "react";

export default function AddReviewModal({ spot }) {
    const [stars, setStars] = useState('')
    const [review, setReview] = useState('')

    const onSubmit = async (e) => {

    }

    return (
        <>
            <div>
                <div>How was your stay?</div>
                <textarea 
                    placeholder="Leave your review here..." 
                    id="review_textBox" 
                    cols="30" rows="10" 
                    value={review}
                    onChange={e => setReview(e.target.value)}
                />
                <form >
                    <fieldset>
                        <input name={'star1'} type="radio" value={1} onChange={e => setStars(e.target.value)}/>
                        <input name={'star2'} type="radio" value={2} onChange={e => setStars(e.target.value)}/>
                        <input name={'star3'} type="radio" value={3} onChange={e => setStars(e.target.value)}/>
                        <input name={'star4'} type="radio" value={4} onChange={e => setStars(e.target.value)}/>
                        <input name={'star5'} type="radio" value={5} onChange={e => setStars(e.target.value)}/>
                    </fieldset>
                </form>
                {stars === 1 ?{stars}+'Star' :{stars}+'Star'}
                <button disabled={} onClick={onSubmit}>Submit Your Review</button>
            </div>

        </>
    )
}