import { useModal } from "../../../context/Modal";
import { thunkFetchRemoveReview, thunkFetchReviews } from "../../../store/reviewReducer";
import { thunkFetchSpotDetails } from "../../../store/spotReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { useParams } from "react-router-dom";


export default function DeleteReview ({ review, spot }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const navigation = useNavigate()

    const removeReview = async (e) => {
        e.preventDefault()

        await dispatch(thunkFetchRemoveReview(review.id))
        await dispatch(thunkFetchReviews(spot.id))
        await dispatch(thunkFetchSpotDetails(spot.id))
        .then(navigation(`spots/${spot.id}`))
        .then(closeModal)
    }

    return (
        <>
        <div id='login_container' className="delete_container">
            <div>Confirm Delete</div>
            <div>Are you sure you want to remove this review?</div>
            <div>
                <button onClick={removeReview}>Yes (Delete Review)</button>
                <button onClick={closeModal}>No (Keep Review)</button>
            </div>
        </div>
        </>
    ) 
}