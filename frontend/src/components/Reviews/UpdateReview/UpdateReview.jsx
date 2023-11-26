// import { Modal } from "../../../context/Modal";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { thunkFetchUpdateReview } from "../../../store/reviewReducer";
import './UpdateReview.css'

export default function UpdateReview({ spot }) {
    const [stars, setStars] = useState('');
    const [review, setReview] = useState('');
    const [hover, setHover] = useState(0);

    const dispatch = useDispatch();

    const onSubmit = async (e) => {
        e.preventDefault();

        const newReview = {
            review,
            stars
        };

        await dispatch(thunkFetchUpdateReview(newReview));
    };

    return (
        <>
            <div id='login_container'>
                <div id="update_text">How was your stay at <div>{spot?.name}</div></div>
                <textarea
                    id="update_textarea"
                    placeholder="Update your review here..."
                    cols="30"
                    rows="10"
                    value={review}
                    onChange={e => setReview(e.target.value)}
                />
                <form onSubmit={onSubmit} id="update_review_form">
                    <div id="star_rating">
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
                    <button type="submit">Update Your Review</button>
                </form>
            </div>
        </>
    );
}
