import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { useEffect } from "react";
import { thunkFetchSpotDetails } from "../../../store/spotReducer";
import { thunkFetchReviews } from "../../../store/reviewReducer";
import './SpotDetails.css'
import ReviewList from "../../Reviews/ReviewList";

export default function SpotDetails () {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const spot = useSelector(state => state.spots.Spots || null);
    const reviews = useSelector(state => state.review.Review || null)
    
    useEffect(() => {
        dispatch(thunkFetchSpotDetails(spotId));
    }, [dispatch, spotId]);

    useEffect(() => {
        dispatch(thunkFetchReviews(spotId))
    }, [dispatch, spotId])

    if (!spot) return null;
    if (!reviews) return null;

    return (
        <>
            <div id="spot_contianer">
                <h2>{spot.name}</h2>
                <h3>{spot.city}, {spot.state}, {spot.country}</h3>
                <div> This is imgs</div>
                <div id="left_description">
                    <h2>Hosted by {spot.Owner?.firstName} {spot.Owner?.lastName}</h2>
                    <p>{spot.description}</p>
                </div>
                <div id="right_review">
                    <div>
                        <div>${spot.price} night</div>
                        <div>
                            <i className="fa-solid fa-star"></i>
                            {spot.avgRating} - {spot.numReviews} reviews
                        </div>
                    </div>
                    <button>Reserve</button>
                </div>
            </div>
            <div id="review_container">
                <h1>
                    <i className="fa-solid fa-star"></i>    
                    {spot.avgRating} - {spot.numReviews} reviews
                </h1>
                {reviews.map(review => {
                    return <div key={review.id}>
                            <ReviewList review={review} />
                           </div>
                })}
            </div>
        </>
    )
}