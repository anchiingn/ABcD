import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { thunkFetchCurrentSpots } from "../../../store/spotReducer";
import { thunkFetchCurrentReviews } from "../../../store/reviewReducer";
import CurrentReviewList from "../ReviewList/CurrentReviewList";

export default function CurrentReview() {
    const dispatch = useDispatch();
    const spots = useSelector(state => Object.values(state.spots.Spots || {}));
    const reviews = useSelector(state => state.review.Review || [])


    useEffect(() => {
        dispatch(thunkFetchCurrentSpots());
        dispatch(thunkFetchCurrentReviews())
    }, [dispatch]);


    return (
        <>
            <div>Manage Reviews</div>
            {reviews.map(review => {
                return <div key={review.id}>
                    <CurrentReviewList review={review} spots={spots}/>
                </div>
            })}
        </>
    )
}