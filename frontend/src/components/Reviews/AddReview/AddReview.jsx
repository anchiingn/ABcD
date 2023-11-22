import { useModal } from "../../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { thunkFetchAddReview } from "../../../store/reviewReducer";
import { thunkFetchSpotDetails } from "../../../store/spotReducer";
import { useState } from "react";

export default function AddReviewModal({ spot }) {
    const [stars, setStars] = useState('')
    const [review, setReview] = useState('')

    const dispatch = useDispatch();

    const onSubmit = async (e) => {
        const newReview = {
            review,
            stars
        }

        await dispatch(thunkFetchAddReview(spot?.id, newReview))
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
                <form onSubmit={onSubmit}>
                    <div>
                        {[1, 2, 3, 4, 5].map(star => (
                            <input
                                key={star.id}
                                name={`star${star}`}
                                type="radio"
                                value={star}
                                onChange={e => setStars(e.target.value)}
                            />
                        ))}
                    </div>
                    {stars ? (stars === '1' ? `${stars} Star` : `${stars} Stars`) : ''}
                    <button type="submit">Submit Your Review</button>
                </form>
            </div>

        </>
    )
}