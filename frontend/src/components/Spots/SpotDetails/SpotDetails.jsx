import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { thunkFetchSpotDetails } from "../../../store/spotReducer";
import { thunkFetchReviews } from "../../../store/reviewReducer";
import './SpotDetails.css'
import ReviewList from "../../Reviews/ReviewList";
import AddReviewModal from "../../AddReviewModal/AddReviewModal";
import OpenModalButton from '../../OpenModalButton/OpenModalButton'

export default function SpotDetails () {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const spot = useSelector(state => state.spots.Spots || null);
    const reviews = useSelector(state => state.review.Review || []);
    const sessionUser = useSelector((state) => state.session.user);

    
    useEffect(() => {
        dispatch(thunkFetchSpotDetails(spotId));
    }, [dispatch, spotId]);

    useEffect(() => {
        dispatch(thunkFetchReviews(spotId))
    }, [dispatch, spotId])


    if (!reviews || !spot || !spot.SpotImages || !spot?.ownerId || !sessionUser) return null;

    const img = spot.SpotImages.find(img => img.preview === true) 

    
    return (
        <>
            <div id="spot_contianer">
                <h2>{spot.name}</h2>
                <h3>{spot.city}, {spot.state}, {spot.country}</h3>
                    <img src={img.url} alt={spot.name} />
                <div id="left_description">
                    <h2>Hosted by {spot.Owner?.firstName} {spot.Owner?.lastName}</h2>
                    <p>{spot.description}</p>
                </div>
                <div id="right_review">
                    <div>
                        <div>${spot.price} night</div>
                        <div>
                            <i className="fa-solid fa-star"></i>
                            {reviews.length === 0  ?'New' :`${spot.avgRating} - ${spot.numReviews} 'Review'`} 
                        </div>
                    </div>
                    <button>Reserve</button>
                </div>
            </div>
            <div id="review_container">
                <h1>
                    <i className="fa-solid fa-star"></i>    
                    {reviews.length === 0  ?'New' :`${spot.avgRating} - ${spot.numReviews} 'Review'`} 
                </h1>
                {sessionUser.id !== spot.ownerId &&(
                    <OpenModalButton 
                        buttonText= 'Post your Review'
                        modalComponent={<AddReviewModal spot={spot}/>}
                    />
                )}
                {reviews.map(review => {
                    return <div key={review.id}>
                            <ReviewList review={review} />
                           </div>
                })}
            </div>
        </>
    )
}