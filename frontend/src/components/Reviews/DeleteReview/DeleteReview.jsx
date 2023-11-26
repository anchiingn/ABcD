import { useModal } from "../../../context/Modal";
import { thunkFetchRemoveReview } from "../../../store/reviewReducer";
import { useDispatch } from "react-redux";

export default function DeleteReview ({ review }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const removeReview = () => {
        dispatch(thunkFetchRemoveReview(review.id))
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