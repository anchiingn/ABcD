import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { thunkFetchSpotDetails } from "../../../store/spotReducer";

export default function SpotDetails () {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const spot = useSelector(state => state.spots.Spots || {});

    useEffect(() => {
        dispatch(thunkFetchSpotDetails(spotId));
    }, [dispatch, spotId]);

    if (!spot) return null;

    return (
        <>
            <div id="spot_contianer">
                <h2>{spot.name}</h2>
                <h3>{spot.city}, {spot.state}, {spot.country}</h3>
                <div> This is imgs</div>
                <div id="left_description">
                    <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
                    <p>{spot.description}</p>
                </div>
                <div id="right_review">
                    <div>
                        <div>${spot.price} night</div>
                        <div>{spot.avgRating}</div>
                        <div>{spot.numReviews}</div>
                    </div>
                    <button>Reserve</button>
                </div>
            </div>
        </>
    )
}