import { Modal } from "../../../context/Modal";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { thunkFetchUpdateReview } from "../../../store/reviewReducer";

export default function UpdateReview({ spots }) {
    console.log(spots)
    const [stars, setStars] = useState('');
    const [review, setReview] = useState('');
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
            <div>
                <div>How was your stay at {spots?.name}</div>
                <textarea
                    placeholder="Update your review here..."
                    cols="30"
                    rows="10"
                    value={review}
                    onChange={e => setReview(e.target.value)}
                />
                <form onSubmit={onSubmit}>
                    <div>
                        {[1, 2, 3, 4, 5].map(star => (
                            <input
                                key={star}
                                name={`star${star}`}
                                type="radio"
                                value={star}
                                onChange={e => setStars(e.target.value)}
                            />
                        ))}
                    </div>
                    {stars ? (stars === '1' ? `${stars} Star` : `${stars} Stars`) : ''}
                    <button type="submit">Update Your Review</button>
                </form>
            </div>
        </>
    );
}
