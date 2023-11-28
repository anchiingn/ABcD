import { useModal } from "../../../context/Modal";
import { useDispatch } from "react-redux";
import { thunkFetchAddReview, thunkFetchReviews } from "../../../store/reviewReducer";
import { thunkFetchSpotDetails } from "../../../store/spotReducer";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AddReviewModal({ spot }) {
    const [stars, setStars] = useState('');
    const [review, setReview] = useState('');
    const [hover, setHover] = useState(0);
    const [validation, setValidation] = useState({});
    const [submit, setSubmit] = useState(false)

    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const navigation = useNavigate();

    useEffect(() => {
        const error = {};
        if (submit) {
            if (review.length < 10 ) {
                error.review = "Review need 10 chracter long";
            }
            if (!stars) {
                error.star = 'star must be from 1 to 5'
            }
        }

        setValidation(error)

    }, [review, stars, submit])

    const onSubmit = async (e) => {
        e.preventDefault()

        setSubmit(true)

        const newReview = {
            review,
            stars
        }

        if (review.length < 10 || !stars) {
            return
        }

        await dispatch(thunkFetchAddReview(spot?.id, newReview))
        await dispatch(thunkFetchReviews(spot.id))
        await dispatch(thunkFetchSpotDetails(spot.id))
        .then(navigation(`spots/${spot.id}`))
        .then(closeModal)

    }

    return (
        <>
            <div id='login_container'>
                <div id="update_text">How was your stay?</div>
                {validation.review && <p className='error'>{validation.review}</p>}
                {validation.star && <p className='error'>{validation.star}</p>}
                <textarea
                    placeholder="Leave your review here..."
                    id="review_textBox"
                    cols="30" rows="10"
                    value={review}
                    onChange={e => setReview(e.target.value)}
                />
                <form onSubmit={onSubmit} id="update_review_form">
                <div id="star_rating" >
                        {[1, 2, 3, 4, 5].map((star, index) => {
                            const currentStar = index + 1;
                            return (
                                <label
                                    key={star}
                                    onMouseEnter={() => setHover(currentStar)}
                                    onMouseLeave={() => setHover(0)}
                                >
                                    <input
                                        key={star}
                                        name={`star${star}`}
                                        type="radio"
                                        value={currentStar}
                                        onChange={e => setStars(e.target.value)}
                                    />
                                    <i className={`fa-solid fa-star`} style={{
                                        color: (hover || stars) >= currentStar ? 'orangered' : 'black'
                                    }}></i>
                                </label>
                            )
                        })}
                    </div>
                    <div>
                        {stars ? (stars === '1' ? `${stars} Star` : `${stars} Stars`) : ''}
                    </div>
                    <button type="submit" disabled={review.length < 10 && !stars}>Submit Your Review</button>
                </form>
            </div>

        </>
    )
}