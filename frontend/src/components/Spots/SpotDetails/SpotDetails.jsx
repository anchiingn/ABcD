import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { thunkFetchSpotDetails } from "../../../store/spotReducer";
import { thunkFetchReviews } from "../../../store/reviewReducer";
import './SpotDetails.css'
import ReviewList from "../../Reviews/ReviewList/ReviewList";
import AddReviewModal from "../../Reviews/AddReview/AddReview";
import OpenModalButton from '../../OpenModalButton/OpenModalButton'

export default function SpotDetails() {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const spot = useSelector(state => state.spots.Spots || null);
    const reviews = useSelector(state => state.review.Review || []);
    const sessionUser = useSelector((state) => state.session.user);


    useEffect(() => {
        dispatch(thunkFetchSpotDetails(spotId));
        dispatch(thunkFetchReviews(spotId))
    }, [dispatch, spotId]);


    if (!reviews || !spot || !spot.SpotImages || !spot?.ownerId) return null;

    const alertButt = () => {
        return alert('Feture Coming Soon...')
    }

    return (
        <>
            <div id="spot_contianer">
                <h2>{spot.name}</h2>
                <h3>{spot.city}, {spot.state}, {spot.country}</h3>
                <div id="imgs">
                    <div id="left_img">
                        {spot.SpotImages.map(img => {
                            if (img.preview === true) {
                                return <img id="preview_img" key={img.id} src={img.url} alt="preview" />
                            }
                        })}
                    </div>
                    <div id="right_imgs">
                        {spot.SpotImages.map(img => {
                            if (img.preview === false) {
                                return (
                                    <div id="side_imgs">
                                        <img key={img.id} src={img.url} alt="imgs" />
                                    </div>
                                )
                            }
                        })}
                    </div>
                </div>
                <div id="left_description">
                    <h2>Hosted by {spot.Owner?.firstName} {spot.Owner?.lastName}</h2>
                    <p>{spot.description}</p>
                </div>
                <div id="right_review">
                    <div>
                        <div>${spot.price} night</div>
                        <div>
                            <i className="fa-solid fa-star"></i>
                            {reviews.length === 0 ? 'New' : `${spot.avgRating} - ${spot.numReviews} 'Review'`}
                        </div>
                    </div>
                    <button onClick={alertButt}>Reserve</button>
                </div>
            </div>
            <div id="review_container">
                <div>
                    <i className="fa-solid fa-star"></i>
                    {reviews.length === 0 ? 'New' : `${spot.avgRating} - ${spot.numReviews} Review`}
                </div>
                {sessionUser && sessionUser.id !== spot.ownerId && (
                    <OpenModalButton
                        buttonText='Post your Review'
                        modalComponent={<AddReviewModal spot={spot} />}
                    />
                )}
                {reviews.map(review => {
                    return <div key={review.id}>
                        <ReviewList review={review} spot={spot} />
                    </div>
                })}
            </div>
        </>
    )
}